import { type YogaNodeServerInstance, createServer } from '@graphql-yoga/node'
import { PrismaClient } from '@prisma/client'
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
    schema,
    context: createContext(prisma),
  })
}
