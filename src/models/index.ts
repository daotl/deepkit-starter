import type { ConditionalExcept } from 'type-fest'

import {
  Category as CategoryR,
  Post as PostR,
  Profile as ProfileR,
  Role as RoleR,
  User as UserR,
} from './generated/interfaces'

export * from './generated/interfaces'

export type ModelR = CategoryR | PostR | ProfileR | RoleR | UserR

export type OmitModelRelation<MR extends ModelR> = ConditionalExcept<
  MR,
  ModelR | ModelR[]
>

export type Category = OmitModelRelation<CategoryR>
export type Post = OmitModelRelation<PostR>
export type Profile = OmitModelRelation<ProfileR>
export type Role = OmitModelRelation<RoleR>
export type User = OmitModelRelation<UserR>

export { CategoryR, PostR, ProfileR, RoleR, UserR }
