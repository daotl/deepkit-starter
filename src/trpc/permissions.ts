import { allow, rule, shield } from 'trpc-shield'

import { Context } from './context'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const isAuthenticated = <Ctx extends Context>() =>
  rule<Ctx>()((ctx, _type, _path, _input, _rawInput) => {
    // eslint-disable-next-line no-console
    console.log(`${_type}: ${_path}`)
    // eslint-disable-next-line no-console, @typescript-eslint/no-non-null-asserted-optional-chain
    console.log(`user: ${ctx.user?.name!}`)

    return ctx.user !== null
  })

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const permissions = <Ctx extends Context>() =>
  shield<Ctx>({
    // trpc-shield does not support nested routers yet:
    // https://github.com/omar-dulaimi/trpc-shield/issues/8
    query: {
      hello: allow,
      protected: isAuthenticated<Ctx>(),
    },
    mutation: {},
  })
