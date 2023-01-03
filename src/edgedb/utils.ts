import { identity } from 'rambdax/immutable'
import type { Spread } from 'type-fest'

import { type EdgedbClient, Cardinality, e } from '.'
import type { InsertShape } from './generated/edgeql-js/insert'
import type { $expr_PathNode } from './generated/edgeql-js/path'
import type {
  ComputeSelectCardinality,
  SelectModifiers,
} from './generated/edgeql-js/select'
import type {
  $scopify,
  BaseType,
  BaseTypeToTsType,
  computeTsType,
  computeTsTypeCard,
  ObjectType,
  TypeSet,
} from './generated/edgeql-js/typesystem'
import type { UpdateShape } from './generated/edgeql-js/update'

export class EdgedbUtil {
  constructor(private client: EdgedbClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async insertRun<Root extends $expr_PathNode>(
    root: Root,
    shape: InsertShape<Root['__element__']>,
  ) {
    const res = (await e
      .insert(root, shape)
      .run(this.client)) as /* computeTsType<
      Root['__element__'],
      typeof Cardinality.One
    > */ computeTsTypeCard<
      BaseTypeToTsType<Root['__element__']>,
      typeof Cardinality.One
    >
    return {
      ...shape,
      ...res,
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async updateRun<
    Expr extends $expr_PathNode,
    Shape extends {
      filter?: SelectModifiers['filter']
      filter_single?: SelectModifiers<Expr['__element__']>['filter_single']
      order_by?: SelectModifiers['order_by']
      limit?: SelectModifiers['limit']
      offset?: SelectModifiers['offset']
      set: UpdateShape<Expr>
    },
  >(
    root: Expr,
    shape: (scope: $scopify<Expr['__element__']>) => Readonly<Shape>,
  ) {
    type Card = ComputeSelectCardinality<Expr, Shape>
    const res = (await e.update(root, shape).run(this.client)) as computeTsType<
      Expr['__element__'],
      Card
    >
    return (
      Array.isArray(res)
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          res.map((obj) => ({ ...shape, ...obj }))
        : res
        ? {
            ...shape,
            ...res,
          }
        : res
    ) as computeExtendedTsType<Expr['__element__'], Card, Shape['set']>
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  upsert<Root extends $expr_PathNode>(
    root: Root,
    on: TypeSet | null,
    toInsert: UpsertShape<Root>,
    toUpdateFn?: (toInsert: UpsertShape<Root>) => UpdateShape<Root>,
  ) {
    return e.insert<Root>(root, toInsert).unlessConflict((obj) => ({
      on,
      else: e.update(obj, () => ({
        set: (toUpdateFn ?? identity)(toInsert),
      })),
    }))
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async upsertRun<
    Root extends $expr_PathNode,
    IS extends InsertShape<Root['__element__']>,
    US extends UpdateShape<Root>,
  >(
    root: Root,
    on: TypeSet | null,
    toInsert: IS & US,
    toUpdateFn?: (toInsert: IS & US) => US,
  ) {
    const res = (await this.upsert(root, on, toInsert, toUpdateFn).run(
      this.client,
    )) as computeTsTypeCard<
      BaseTypeToTsType<Root['__element__']>,
      typeof Cardinality.One
    >
    return {
      ...(toInsert as IS),
      ...res,
    }
  }
}

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
