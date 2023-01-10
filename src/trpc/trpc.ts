import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'

import { extractUserFromRequest } from '~/auth'
import { type HttpContext } from '~/http'
import type { User } from '~/models'

import { type Context } from './context'
import { permissions } from './permissions'

export const t = initTRPC.context<Record<string, unknown> & Context>().create({
  transformer: superjson,
  // errorFormatter: ErrorFormatter<T['ctx'], any>,
})

const trpcErrUnauthorized = new TRPCError({
  code: 'UNAUTHORIZED',
  message: 'Unauthorized',
})

interface ProcedureCtx<Ctx extends HttpContext> {
  public: Omit<Ctx, 'user'> & { user: never }
  optional: Ctx
  protected: Omit<Ctx, 'user'> & { user: User }
  admin: Ctx
}

export type ProcedureContext = ProcedureCtx<Context>

const publicMiddleware = t.middleware(async ({ ctx, next }) => {
  return next({
    ctx: { ...ctx, user: undefined } as unknown as ProcedureContext['public'],
  })
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function checkSignedInUserMiddleware<Optional extends boolean>(
  optional: Optional,
) {
  return t.middleware(async ({ ctx, next }) => {
    const user = extractUserFromRequest(ctx.req)

    if (!optional && !user) {
      throw trpcErrUnauthorized
    }

    return next({
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      ctx: {
        ...ctx,
        user,
      } as ProcedureContext[Optional extends true ? 'optional' : 'protected'],
    })
  })
}

const checkAdminMiddleware = t.middleware(async ({ ctx, next }) => {
  throw trpcErrUnauthorized
  return next({
    ctx: ctx as ProcedureContext['admin'],
  })
})

export const p = {
  public: t.procedure.use(publicMiddleware).use(permissions()),
  optional: t.procedure
    .use(checkSignedInUserMiddleware(true))
    .use(permissions()),
  protected: t.procedure
    .use(checkSignedInUserMiddleware(false))
    .use(permissions()),
  admin: t.procedure.use(checkAdminMiddleware).use(permissions()),
}
