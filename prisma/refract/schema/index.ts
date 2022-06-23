import { type Types } from '@cwqt/refract'
import fs from 'fs'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exports = (
  await Promise.all(
    fs
      .readdirSync(__dirname)
      .filter((tsFile) => tsFile !== 'index.ts')
      .map((tsFile) => `./${tsFile.replace('.ts', '.js')}`)
      .map((path) => import(path)),
  )
)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .flatMap((arr) => arr.default as Types.Blocks.Block[])

export default exports
