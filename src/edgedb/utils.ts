import type { Except } from 'type-fest'

import type { ModelMap as ModelTypeMap } from '~/models'

import { e } from '.'
import { castMaps } from './generated/edgeql-js/imports'
import type models from './generated/edgeql-js/modules/default'
import { type $bool } from './generated/edgeql-js/modules/std'
import * as $ from './generated/edgeql-js/reflection'

export type ModelMap = Except<typeof models, 'Base'>
export type Model = ModelMap[keyof ModelTypeMap]

type EBool = castMaps.orScalarLiteral<$.TypeSet<$bool>>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const all = (...args: [EBool, ...EBool[]]) => e.all(e.set(...args))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const any = (...args: [EBool, ...EBool[]]) => e.any(e.set(...args))

export const filterPropsEqual = <
  K extends keyof ModelMap,
  M extends ModelMap[K],
>(
  m: M,
  filter: Partial<ModelTypeMap[K]>,
): $.$expr_Function<$bool, $.Cardinality.One> =>
  // @ts-expect-error ignore
  all(...Object.entries(filter).map(([k, v]) => e.op(m[k], '=', v)))
