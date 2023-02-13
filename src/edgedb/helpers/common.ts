import { identity } from 'rambdax/immutable'

import { e } from '..'
import type { InsertShape } from '../generated/edgeql-js/insert'
import type { $expr_PathNode } from '../generated/edgeql-js/path'
import type { $scopify, TypeSet } from '../generated/edgeql-js/typesystem'
import type { UpdateShape } from '../generated/edgeql-js/update'

export type UpsertShape<Root extends $expr_PathNode> = InsertShape<
  Root['__element__']
> &
  UpdateShape<Root>

export const upsertConflictGetter =
  <
    Root extends $expr_PathNode,
    On extends TypeSet | null,
    InsShape extends UpsertShape<Root>,
    UpShapeFn extends (insertShape: UpsertShape<Root>) => UpdateShape<Root>,
  >(
    on: On,
    insertShape: InsShape,
    updateShapeFn: UpShapeFn = identity as UpShapeFn,
  ) =>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  (obj: $scopify<Root['__element__']>) => ({
    on,
    else: e.update(obj, () => ({
      set: updateShapeFn(insertShape),
    })),
  })
