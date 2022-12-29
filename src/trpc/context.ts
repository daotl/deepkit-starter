import { HttpRequest, HttpResponse } from '@deepkit/http'
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express'

import { type EdgedbClient } from '~/edgedb'
import { type HttpContext } from '~/http'

export type Context = HttpContext & {
  edgedb: EdgedbClient
}

// created for each request
export const genCreateContext =
  (edgedb: EdgedbClient) =>
  ({ req, res }: CreateExpressContextOptions): Context =>
    ({
      req: req as unknown as HttpRequest,
      res: res as unknown as HttpResponse,
      edgedb,
    } as unknown as Context)

// type Context = trpc.inferAsyncReturnType<typeof createContext>
