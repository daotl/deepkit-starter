import 'module-alias/register'

import { createClient } from 'edgedb'
import { omit } from 'rambdax/immutable'

import { AuthConfig } from '~/auth'
import { e, EU } from '~/edgedb'

const client = createClient().withConfig({
  allow_user_specified_id: true,
})

async function main(): Promise<void> {
  const users = await Promise.all([
    EU.upsert(
      e.User,
      e.User.email,
      {
        id: new AuthConfig().mockUserId,
        email: 'nex@daot.io',
        name: 'Nex',
      },
      omit('id'),
    ),
    EU.upsert(e.User, e.User.email, {
      email: 'john@daot.io',
      name: 'John',
    }),
    EU.upsert(e.User, e.User.email, {
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
    ...users,
    ...posts.map((p) =>
      // FIXME: Update author also. Currently if we don't omit `author`, there's an error:
      //   Error: Cannot extract repeated or aliased expression into 'WITH' block, expression or its aliases appear outside root scope
      EU.upsert(e.Post, e.Post.title, p, omit('author')).run(client),
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
