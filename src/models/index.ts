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

export type OmitModelRelations<MR extends ModelR> = ConditionalExcept<
  MR,
  ModelR | ModelR[] | null | undefined
>

export type Category = OmitModelRelations<CategoryR>
export type Post = OmitModelRelations<PostR>
export type Profile = OmitModelRelations<ProfileR>
export type Role = OmitModelRelations<RoleR>
export type User = OmitModelRelations<UserR>

export type Model = Category | Post | Profile | Role | User

export type ModelMap = {
  Category: Category
  Post: Post
  Profile: Profile
  Role: Role
  User: User
}

export { CategoryR, PostR, ProfileR, RoleR, UserR }
