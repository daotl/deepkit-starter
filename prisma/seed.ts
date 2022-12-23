/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main(): Promise<void> {
  const nex = await prisma.user.upsert({
    where: { email: 'nex@daot.io' },
    update: {},
    create: {
      email: 'nex@daot.io',
      name: 'Nex',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const zwj = await prisma.user.upsert({
    where: { email: 'john@daot.io' },
    update: {},
    create: {
      email: 'john@daot.io',
      name: 'John',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  const lf = await prisma.user.upsert({
    where: { email: 'marie@daot.io' },
    update: {},
    create: {
      email: 'marie@daot.io',
      name: 'Marie',
      posts: {
        create: [
          {
            title: 'FusionGalaxy Developer No.1',
            content: 'https://fusiongalaxy.cn',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ nex, zwj, lf })
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
