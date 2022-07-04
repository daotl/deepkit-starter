import 'reflect-metadata'

import { http, HttpRequest, HttpResponse } from '@deepkit/http'
import { PrismaClient } from '@prisma/client'
import { Request } from 'cross-undici-fetch'
import stream from 'stream'

import { AutenticatedUserParameterResolver, authGroup } from '~/auth'
import { UserCls } from '~/model'

import { type YogaServerInstance, createYogaServer } from './yoga'

// Reference: https://www.graphql-yoga.com/docs/integrations/z-other-environments
@http.controller().resolveParameter(UserCls, AutenticatedUserParameterResolver)
export default class GraphqlController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private yoga: YogaServerInstance

  constructor(protected prisma: PrismaClient) {
    // The real server is used as an Express middleware
    this.yoga = createYogaServer(prisma)
  }

  @http.POST('/api/graphql').use(authGroup('protected'))
  async handleGraphql(
    req: HttpRequest,
    res: HttpResponse,
    user: UserCls,
  ): Promise<void> {
    return this.handleRequest(req, res, user)
  }

  @http.GET('/api/graphql').use(authGroup('public'))
  async graphiql(
    req: HttpRequest,
    res: HttpResponse,
    user: UserCls,
  ): Promise<void> {
    return this.handleRequest(req, res, user)
  }

  async handleRequest(
    req: HttpRequest,
    res: HttpResponse,
    user: UserCls,
  ): Promise<void> {
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
      user,
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

  // Placeholder
  // export class GraphqlController {
  //   @http.GET('/api/graphql')
  //   graphql(): string {
  //     return 'Hello World!'
  //   }
  // }
}
