import type {
  objectInputType,
  objectOutputType,
  UnknownKeysParam,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
} from 'zod'
import { z } from 'zod'

import * as M from './generated/interfaces.zod'
import * as DTO from './generated/zod'

export const zStdBaseObject = M.stdBaseObjectSchema
export const zStdObject = M.stdObjectSchema
export const zBase = M.baseSchema
export const zRole = M.roleSchema
export const zCategory = M.categorySchema
export const zPost = M.postSchema
export const zProfile = M.profileSchema
export const zUser = M.userSchema

const patchModelOmitMask = { createdAt: true } as const

const patchModelSchema = <
  T extends ZodRawShape,
  UnknownKeys extends UnknownKeysParam,
  Catchall extends ZodTypeAny,
  S extends ZodObject<
    T,
    UnknownKeys,
    Catchall,
    objectOutputType<T, Catchall>,
    objectInputType<T, Catchall>
  >,
>(
  s: S,
): ZodObject<
  Omit<S['shape'], keyof typeof patchModelOmitMask>,
  UnknownKeys,
  Catchall
> => s.omit(patchModelOmitMask)

// Create/Update/Select DTOs
export const zCreateBaseInput = patchModelSchema(DTO.CreateBaseSchema)
export const zUpdateBaseInput = patchModelSchema(DTO.UpdateBaseSchema)
export const zBaseFilter = zCreateBaseInput.partial()

export const zCreateCategoryInput = patchModelSchema(DTO.CreateCategorySchema)
export const zUpdateCategoryInput = patchModelSchema(DTO.UpdateCategorySchema)
export const zategorFilter = zCreateCategoryInput.partial()

export const zCreatePostInput = patchModelSchema(DTO.CreatePostSchema).extend({
  authorId: z.string().uuid(),
})
export const zUpdatePostInput = patchModelSchema(DTO.UpdatePostSchema)
export const zPostFilter = zCreatePostInput.partial()

export const zCreateProfileInput = patchModelSchema(DTO.CreateProfileSchema)
export const zUpdateProfileInput = patchModelSchema(DTO.UpdateProfileSchema)
export const zProfileFilter = zCreateProfileInput.partial()

export const zCreateUserInput = patchModelSchema(DTO.CreateUserSchema)
export const zUpdateUserInput = patchModelSchema(DTO.UpdateUserSchema)
export const zUserFilter = zCreateUserInput.partial()
