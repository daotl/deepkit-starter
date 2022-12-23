// Generate the schema with `npx ts-node-esm refract.ts`

import path from 'node:path'
import url from 'node:url'

import _Refract from '@cwqt/refract'
import { defaultImport } from 'default-import'

import schema from './schema/index.js'

const Refract = defaultImport(_Refract)

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

void Refract({
  datasource: {
    provider: 'postgresql',
    url: 'env("POSTGRES_URL")',
    shadowDatabaseUrl: 'env("POSTGRES_SHADOW_URL")',
  },
  generators: [
    {
      name: 'client',
      provider: 'prisma-client-js',
      previewFeatures: [
        'interactiveTransactions',
        // https://github.com/prisma/prisma/releases/tag/4.3.0
        // /@ts-expect-error ignore
        // 'fieldReference', // Not supported by `prisma-trpc-generator@0.4.4` yet
        // @ts-expect-error ignore
        'filteredRelationCount',
        // https://github.com/prisma/prisma/releases/tag/4.5.0
        // /@ts-expect-error ignore
        // 'extendedWhereUnique', // Not supported by `prisma-trpc-generator@0.4.4` yet
      ],
    },
    {
      name: 'erd',
      provider: 'prisma-erd-generator',
      output: 'generated/erd.md',
    },
    {
      name: 'dbml',
      provider: 'prisma-dbml-generator',
      output: 'generated',
      // @ts-expect-error `refract` missing type
      outputName: 'schema.dbml',
      projectName: 'BDWare BaaS Web',
      projectDatabaseType: 'PostgreSQL',
    },
  ],
  output: path.resolve(__dirname, '../schema.prisma'),
  schema,
})
