import 'module-alias/register'

import { createClient } from 'edgedb'
import { omit } from 'rambdax/immutable'

import { AuthConfig } from '~/auth'
import { type UpsertShape, e, EdgedbUtil } from '~/edgedb'
import * as E from '~/edgedb'

const client = createClient().withConfig({
  allow_user_specified_id: true,
})

async function main(): Promise<void> {
  const eu = new EdgedbUtil(client)
  // Examples:
  // const ex1 = await eu.insertSelect(
  //   e.User,
  //   { name: '', email: '' },
  //   // { name: true, email: true },
  // )
  // const ex2 = await eu.updateSelect(
  //   e.User,
  //   () => ({ set: { name: '', email: '' } }),
  //   // { name: true, email: true },
  // )
  // const ex3 = await eu.updateSelect(
  //   e.User,
  //   () => ({ filter_single: { email: '' }, set: { name: '', email: '' } }),
  //   // { name: true, email: true },
  // )
  // const ex4 = await eu.upsertSelect(
  //   e.User,
  //   e.User.email,
  //   {
  //     email: 'nex@daot.io',
  //     name: 'Nex',
  //   },
  //   identity,
  //   // { name: true, email: true },
  // )
  // const ex5 = await eu.selectCount(e.User, () => ({
  //   offset: 100,
  //   limit: 10,
  //   ...e.User['*'],
  // }))

  const users = await Promise.all([
    E.upsert(
      e.User,
      e.User.email,
      {
        id: new AuthConfig().mockUserId,
        email: 'nex@daot.io',
        name: 'Nex',
      },
      omit<UpsertShape<typeof e.User>>('id'),
    ),
    E.upsert(e.User, e.User.email, {
      email: 'john@daot.io',
      name: 'John',
    }),
    E.upsert(e.User, e.User.email, {
      email: 'marie@daot.io',
      name: 'Marie',
    }),
  ])

  const posts = [
    {
      title:
        'EdgeDB is an open-source database designed as a spiritual successor to SQL and the relational paradigm.',
      content: 'https://www.edgedb.com/',
      published: true,
      author: users[0],
    },
    {
      title: 'tRPC——End-to-end typesafe APIs made easy.',
      content: 'https://trpc.io/',
      published: true,
      author: users[1],
    },
    {
      title: 'DAOT Labs',
      content: 'https://daot.io/',
      published: true,
      author: users[2],
    },
  ] as const

  await Promise.all([
    ...posts.map((p) =>
      // FIXME: Update author also. Currently if we don't omit `author`, there's an error:
      //   Error: Cannot extract repeated or aliased expression into 'WITH' block, expression or its aliases appear outside root scope
      eu.upsert(e.Post, e.Post.title, p, omit<typeof p>('author')),
    ),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await client.close()
  })
