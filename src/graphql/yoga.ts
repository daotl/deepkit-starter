import { envelop } from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { type YogaNodeServerInstance, createServer } from '@graphql-yoga/node'
import { PrismaClient } from '@prisma/client'
import { type ExecutionResult } from 'graphql'
import path from 'path'
import { buildSchemaSync } from 'type-graphql'

import type { DeepkitHttpContext } from '~/types/deepkit'

import { createContext } from './context'
import helloResolver from './hello/resolver'
import { resolvers as prismaResolvers } from './prisma/generated'

export type YogaServerInstance = YogaNodeServerInstance<
  DeepkitHttpContext,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

const resolvers = [...prismaResolvers, helloResolver] as const

const schema = buildSchemaSync({
  resolvers,
  emitSchemaFile: {
    path: path.resolve(__dirname, '../../graphql/schema.gql'),
    commentDescriptions: true,
    sortedSchema: false, // by default the printed schema is sorted alphabetically
  },
})

export function createYogaServer(prisma: PrismaClient): YogaServerInstance {
  return createServer<DeepkitHttpContext>({
    plugins: [
      useGraphQlJit(
        {
          // your compiler options here. See https://github.com/zalando-incubator/graphql-jit#compiledquery--compilequeryschema-document-operationname-compileroptions
        },
        {
          // cache: lru(), // Pass in a custom cache instance, by default a new LRU cache is created which uses the default `max` and `ttl` settings
          onError: (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            r: ExecutionResult<Record<string, any>, Record<string, any>>,
          ): void => {
            // custom error handler
            console.error(r)
          },
        },
      ),
    ],
    context: createContext(prisma),
    schema,
  })
}
