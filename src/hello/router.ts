import { z } from 'zod'

import { e, EdgedbClient } from '~/edgedb'
import { p, t } from '~/trpc'

export class Person {
  constructor(
    private name: string,
    private email: string,
    private motto: string,
  ) {}
}

export class HelloRouter {
  constructor(private edgedb: EdgedbClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router = () =>
    t.router({
      hello: this.hello,
      protected: this.protected,
    })

  // @http.GET('/api/hello/:name').use(authGroup('public'))
  // @http.serialization({ groupsExclude: ['secret'] })
  hello = p.optional
    .input(
      z.object({
        name: z.string(),
        motto: z.string().optional(),
      }),
    )
    .query(async ({ input: { name, motto } }) => {
      const users = await e
        .select(e.User, (u) => ({
          filter: e.op(u.name, '=', name),
          ...e.User['*'],
        }))
        .run(this.edgedb)
      const email = users && users[0] ? ` Your email is ${users[0].email}` : ''
      return new Person(name, email, motto ?? 'No motto')
      // return `Hello ${name}! ${email} ${motto ?? 'No motto'}`
    })

  // @http.GET('/api/protected').use(authGroup('protected'))
  protected = p.optional.query(
    ({ ctx: { user } }) => `Hi ${user?.name ?? ('anonymous' as string)}`,
  )
}
