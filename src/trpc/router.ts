import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import superjson from 'superjson'

import { appRouter as prismaRouter } from '~/prisma/generated/routers'

import { t } from './trpc'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRouter() {
  // List all the routers here
  return t.router({
    // List all the routers here
    prisma: prismaRouter,
  })
}

export type TrpcRouter = ReturnType<typeof createRouter>

const client = createTRPCProxyClient<TrpcRouter>({
  transformer: superjson,
  links: [httpBatchLink({ url: '/api/trpc' })],
})

export type TrpcClient = typeof client
