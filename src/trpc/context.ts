import { HttpRequest, HttpResponse } from '@deepkit/http'
import { type PrismaClient } from '@prisma/client'
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express'

import { type HttpContext } from '~/http'

export type Context = HttpContext & {
  prisma: PrismaClient
}

// created for each request
export const genCreateContext =
  (prisma: PrismaClient) =>
  ({ req, res }: CreateExpressContextOptions): Context =>
    ({
      req: req as unknown as HttpRequest,
      res: res as unknown as HttpResponse,
      prisma,
    } as unknown as Context)

// type Context = trpc.inferAsyncReturnType<typeof createContext>
