import 'reflect-metadata'

import { http, HttpRequest, HttpResponse } from '@deepkit/http'
import { type YogaNodeServerInstance, createServer } from '@graphql-yoga/node'
import { PrismaClient } from '@prisma/client'
import { Request } from 'cross-undici-fetch'
import path from 'path'
import stream from 'stream'
import { type BuildSchemaOptions, buildSchemaSync } from 'type-graphql'

import { resolvers as prismaResolvers } from './generated/prisma'
import helloResolver from './hello/resolver'

const resolvers: BuildSchemaOptions['resolvers'] = [
  ...prismaResolvers,
  helloResolver,
]

const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: {
    path: path.resolve(__dirname, '../../graphql/schema.gql'),
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
})

interface DeepkitHttpContext {
  req: HttpRequest
  res: HttpResponse
}

// Reference: https://www.graphql-yoga.com/docs/integrations/z-other-environments
export default class GraphqlController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private yoga: YogaNodeServerInstance<DeepkitHttpContext, {}, {}>

  constructor(protected prisma: PrismaClient) {
    // The real server is used as an Express middleware
    this.yoga = createServer<DeepkitHttpContext>({
      schema,
      context: { prisma },
    })
  }

  @http.ANY('/api/graphql')
  async graphql(req: HttpRequest, res: HttpResponse): Promise<void> {
    // req.url is a full url here not a relative path
    const request = new Request(req.headers.host! + req.url!, {
      method: req.method,
      headers: Object.entries(req.headers).map(([name, value]) => [
        name,
        (value instanceof Array ? value.concat(',') : value) as string,
      ]),
      // req.body should be a valid BodyInit like an AsyncIterable, a ReadableStream, a Node.js Readable, a string or a Buffer etc...
      body:
        req.method === 'GET' || req.method === 'HEAD'
          ? undefined
          : stream.Readable.toWeb(req),
    })

    // Second parameter becomes your server context
    const response = await this.yoga.handleRequest(request, {
      req,
      res,
    })
    // response is a WHATWG `Response` object

    // Create a headers object for your middleware response
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    // body: response.body if it accepts a ReadableStream or an AsyncIterable
    // body: Readable.from(response.body) if it accepts a Node.js Readable
    res.writeHead(response.status, headers).end(response.body)
  }
}

// Placeholder
// export class GraphqlController {
//   @http.GET('/api/graphql')
//   graphql(): string {
//     return 'Hello World!'
//   }
// }
