// Generate the schema with `npx ts-node refract.ts`

import _Refract from '@cwqt/refract'
import { defaultImport } from 'default-import'
import path from 'path'
import url from 'url'

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
      previewFeatures: [],
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
    {
      name: 'typegraphql',
      provider: 'typegraphql-prisma',
      output: '../src/graphql/prisma/generated',
    },
  ],
  output: path.resolve(__dirname, '../schema.prisma'),
  schema,
})
