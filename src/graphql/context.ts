import { PrismaClient } from '@prisma/client'

export interface GraphQLContext {
  prisma: PrismaClient
}

export function createContext(prisma: PrismaClient): GraphQLContext {
  return {
    prisma,
  }
}
