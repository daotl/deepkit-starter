import type { Cardinality } from 'edgedb/dist/reflection'
import { identity, omit } from 'rambdax/immutable'
import type { Spread } from 'type-fest'

import { /* type EdgedbClient, */ e } from '.'
import type {
  $expr_Insert,
  $expr_InsertUnlessConflict,
  InsertShape,
} from './generated/edgeql-js/insert'
// import type { $Object } from './generated/edgeql-js/modules/std'
import type { $expr_PathNode, $linkPropify } from './generated/edgeql-js/path'
import type {
  ComputeSelectCardinality,
  objectTypeToSelectShape,
  SelectModifierNames,
  SelectModifiers,
  UnknownSelectModifiers,
} from './generated/edgeql-js/select'
import type {
  $scopify,
  BaseType,
  BaseTypeToTsType,
  // computeTsType,
  computeTsTypeCard,
  ObjectType,
  ObjectTypeExpression,
  TypeSet,
} from './generated/edgeql-js/typesystem'
import type { $expr_Update, UpdateShape } from './generated/edgeql-js/update'

export type UpsertShape<Root extends $expr_PathNode> = InsertShape<
  Root['__element__']
> &
  UpdateShape<Root>

export type computeExtendedTsType<
  T extends ObjectType,
  C extends Cardinality,
  Ext extends object,
> = BaseType extends T
  ? unknown
  : computeTsTypeCard<Spread<Ext, BaseTypeToTsType<T>>, C>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const selectCount = <
  Expr extends ObjectTypeExpression,
  Shape extends objectTypeToSelectShape<Expr['__element__']> &
    SelectModifiers<Expr['__element__']>,
  Modifiers extends UnknownSelectModifiers = Pick<Shape, SelectModifierNames>,
>(
  expr: Expr,
  shape: (
    scope: $scopify<Expr['__element__']> &
      $linkPropify<{
        [k in keyof Expr]: k extends '__cardinality__'
          ? Cardinality.One
          : Expr[k]
      }>,
  ) => Readonly<Shape>,
) => {
  const q = e.select<Expr, Shape, Modifiers>(expr, shape)
  return e.select({
    count: e.count(omit(['offset', 'limit'], q)),
    data: q,
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const insertSelect = <
  Root extends $expr_PathNode,
  ExprInsertExact extends [$expr_Insert<Root['__element__']>],
  SelShape extends objectTypeToSelectShape<ExprInsertExact[0]['__element__']> &
    SelectModifiers<ExprInsertExact[0]['__element__']> = Root['*'],
>(
  root: Root,
  insertShape: InsertShape<Root['__element__']>,
  selectShape: SelShape = root['*'] as SelShape,
) =>
  e.select<ExprInsertExact[0], SelShape>(
    e.insert(root, insertShape),
    () => selectShape,
  )

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateSelect = <
  Expr extends $expr_PathNode,
  UpShape extends {
    filter?: SelectModifiers['filter']
    filter_single?: SelectModifiers<Expr['__element__']>['filter_single']
    order_by?: SelectModifiers['order_by']
    limit?: SelectModifiers['limit']
    offset?: SelectModifiers['offset']
    set: UpdateShape<Expr>
  },
  ExprUpdateExact extends [
    $expr_Update<Expr['__element__'], ComputeSelectCardinality<Expr, UpShape>>,
  ],
  SelShape extends objectTypeToSelectShape<ExprUpdateExact[0]['__element__']> &
    SelectModifiers<ExprUpdateExact[0]['__element__']> = Expr['*'],
>(
  expr: Expr,
  updateShape: (scope: $scopify<Expr['__element__']>) => Readonly<UpShape>,
  selectShape: SelShape = expr['*'] as SelShape,
) =>
  e.select<ExprUpdateExact[0], SelShape>(
    e.update(expr, updateShape),
    () => selectShape,
  )

const upsertConflictGetter =
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

export const upsert = <
  Root extends $expr_PathNode,
  On extends TypeSet | null,
  InsShape extends UpsertShape<Root>,
  UpShapeFn extends (
    insertShape: UpsertShape<Root>,
  ) => UpdateShape<Root> = typeof identity,
>(
  root: Root,
  on: On,
  insertShape: InsShape,
  updateShapeFn: UpShapeFn = identity as UpShapeFn,
): $expr_InsertUnlessConflict<
  Root['__element__'],
  ReturnType<
    ReturnType<typeof upsertConflictGetter<Root, On, InsShape, UpShapeFn>>
  >
> =>
  e
    .insert<Root>(root, insertShape)
    .unlessConflict(
      upsertConflictGetter<Root, On, InsShape, UpShapeFn>(
        on,
        insertShape,
        updateShapeFn,
      ),
    )

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const upsertSelect = <
  Root extends $expr_PathNode,
  On extends TypeSet | null,
  InsShape extends UpsertShape<Root>,
  ExprInsertUnlessConflictExact extends [
    $expr_InsertUnlessConflict<
      Root['__element__'],
      ReturnType<
        ReturnType<typeof upsertConflictGetter<Root, On, InsShape, UpShapeFn>>
      >
    >,
  ],
  UpShapeFn extends (
    insertShape: UpsertShape<Root>,
  ) => UpdateShape<Root> = typeof identity,
  SelShape extends objectTypeToSelectShape<
    ExprInsertUnlessConflictExact[0]['__element__']
  > &
    SelectModifiers<
      ExprInsertUnlessConflictExact[0]['__element__']
    > = Root['*'],
>(
  root: Root,
  on: On,
  insertShape: InsShape,
  updateShapeFn: UpShapeFn = identity as UpShapeFn,
  selectShape: SelShape = root['*'] as SelShape,
) =>
  e.select<ExprInsertUnlessConflictExact[0], SelShape>(
    upsert(root, on, insertShape, updateShapeFn),
    () => selectShape,
  )

// export class EdgedbUtil {
//   constructor(private client: EdgedbClient) {}

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   selectCount = <
//     Expr extends ObjectTypeExpression,
//     Shape extends objectTypeToSelectShape<Expr['__element__']> &
//       SelectModifiers<Expr['__element__']>,
//     Modifiers extends UnknownSelectModifiers = Pick<Shape, SelectModifierNames>,
//   >(
//     expr: Expr,
//     shape: (
//       scope: $scopify<Expr['__element__']> &
//         $linkPropify<{
//           [k in keyof Expr]: k extends '__cardinality__'
//             ? Cardinality.One
//             : Expr[k]
//         }>,
//     ) => Readonly<Shape>,
//   ) => selectCount<Expr, Shape, Modifiers>(expr, shape).run(this.client)

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   insertSelect = <
//     Root extends $expr_PathNode,
//     ExprInsertExact extends [$expr_Insert<Root['__element__']>],
//     SelShape extends objectTypeToSelectShape<
//       ExprInsertExact[0]['__element__']
//     > &
//       SelectModifiers<ExprInsertExact[0]['__element__']> = Root['*'],
//   >(
//     root: Root,
//     insertShape: InsertShape<Root['__element__']>,
//     selectShape: SelShape = root['*'] as SelShape,
//   ) =>
//     insertSelect<Root, ExprInsertExact, SelShape>(
//       root,
//       insertShape,
//       selectShape,
//     ).run(this.client)

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   updateSelect = <
//     Expr extends $expr_PathNode,
//     UpShape extends {
//       filter?: SelectModifiers['filter']
//       filter_single?: SelectModifiers<Expr['__element__']>['filter_single']
//       order_by?: SelectModifiers['order_by']
//       limit?: SelectModifiers['limit']
//       offset?: SelectModifiers['offset']
//       set: UpdateShape<Expr>
//     },
//     ExprUpdateExact extends [
//       $expr_Update<
//         Expr['__element__'],
//         ComputeSelectCardinality<Expr, UpShape>
//       >,
//     ],
//     SelShape extends objectTypeToSelectShape<
//       ExprUpdateExact[0]['__element__']
//     > &
//       SelectModifiers<ExprUpdateExact[0]['__element__']> = Expr['*'],
//   >(
//     expr: Expr,
//     updateShape: (scope: $scopify<Expr['__element__']>) => Readonly<UpShape>,
//     selectShape: SelShape = expr['*'] as SelShape,
//   ) =>
//     updateSelect<Expr, UpShape, ExprUpdateExact, SelShape>(
//       expr,
//       updateShape,
//       selectShape,
//     ).run(this.client)

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   upsert = <
//     Root extends $expr_PathNode,
//     On extends TypeSet | null,
//     InsShape extends UpsertShape<Root>,
//     UpShapeFn extends (
//       insertShape: UpsertShape<Root>,
//     ) => UpdateShape<Root> = typeof identity,
//   >(
//     root: Root,
//     on: On,
//     insertShape: InsShape,
//     updateShapeFn: UpShapeFn = identity as UpShapeFn,
//   ) => {
//     type El = Root['__element__']
//     type Conflict = ReturnType<
//       ReturnType<typeof upsertConflictGetter<Root, On, InsShape, UpShapeFn>>
//     >
//     type ConflictElse = Conflict['else']
//     type ConflictElseElement = ConflictElse['__element__']
//     type ConflictElseCardinality = ConflictElse['__cardinality__']
//     return upsert<Root, On, InsShape, UpShapeFn>(
//       root,
//       on,
//       insertShape,
//       updateShapeFn,
//     ).run(this.client) as Promise<
//       computeTsType<
//         ConflictElse extends TypeSet
//           ? ConflictElseElement['__name__'] extends El['__name__']
//             ? El
//             : $Object
//           : El,
//         ConflictElse extends TypeSet
//           ? ConflictElseCardinality
//           : Cardinality.AtMostOne
//       >
//     >
//   }

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   upsertSelect = <
//     Root extends $expr_PathNode,
//     On extends TypeSet | null,
//     InsShape extends UpsertShape<Root>,
//     ExprInsertUnlessConflictExact extends [
//       $expr_InsertUnlessConflict<
//         Root['__element__'],
//         ReturnType<
//           ReturnType<typeof upsertConflictGetter<Root, On, InsShape, UpShapeFn>>
//         >
//       >,
//     ],
//     UpShapeFn extends (
//       insertShape: UpsertShape<Root>,
//     ) => UpdateShape<Root> = typeof identity,
//     SelShape extends objectTypeToSelectShape<
//       ExprInsertUnlessConflictExact[0]['__element__']
//     > &
//       SelectModifiers<
//         ExprInsertUnlessConflictExact[0]['__element__']
//       > = Root['*'],
//   >(
//     root: Root,
//     on: On,
//     insertShape: InsShape,
//     updateShapeFn: UpShapeFn = identity as UpShapeFn,
//     selectShape: SelShape = root['*'] as SelShape,
//   ) =>
//     upsertSelect<
//       Root,
//       On,
//       InsShape,
//       ExprInsertUnlessConflictExact,
//       UpShapeFn,
//       SelShape
//     >(root, on, insertShape, updateShapeFn, selectShape).run(this.client)
// }
