import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

import { app } from '~/app'
import { HelloRouter } from '~/hello'
import { PostRouter } from '~/post'

import { t } from './trpc'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRouter() {
  return t.router({
    // List all the routers here
    hello: app.get<HelloRouter>().router(),
    post: app.get<PostRouter>().router(),
  })
}

export type TrpcRouter = ReturnType<typeof createRouter>

const client = createTRPCProxyClient<TrpcRouter>({
  transformer: superjson,
  links: [httpBatchLink({ url: '/api/trpc' })],
})

export type TrpcClient = typeof client
