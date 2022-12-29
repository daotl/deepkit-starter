import { identity } from 'rambdax/immutable'

import { e } from '.'
import type { InsertShape } from './generated/edgeql-js/insert'
import type { $expr_PathNode } from './generated/edgeql-js/path'
import type { TypeSet } from './generated/edgeql-js/typesystem'
import type { UpdateShape } from './generated/edgeql-js/update'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function upsert<Root extends $expr_PathNode>(
  root: Root,
  on: TypeSet | null,
  toInsert: InsertShape<Root['__element__']> & UpdateShape<Root>,
  toUpdateFn?: (
    toInsert: InsertShape<Root['__element__']> & UpdateShape<Root>,
  ) => UpdateShape<Root>,
) {
  return e.insert<Root>(root, toInsert).unlessConflict((obj) => ({
    on,
    else: e.update(obj, () => ({
      set: (toUpdateFn ?? identity)(toInsert),
    })),
  }))
}
