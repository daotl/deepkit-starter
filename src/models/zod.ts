import type {
  objectInputType,
  objectOutputType,
  UnknownKeysParam,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
} from 'zod'
import { z } from 'zod'

import {
  CreateBaseSchema,
  CreateCategorySchema,
  CreatePostSchema,
  CreateProfileSchema,
  CreateUserSchema,
  RoleSchema,
  UpdateBaseSchema,
  UpdateCategorySchema,
  UpdatePostSchema,
  UpdateProfileSchema,
  UpdateUserSchema,
} from './generated/zod'

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

// Enums
export const roleSchema = RoleSchema

// Create/Update DTOs
export const createBaseSchema = patchModelSchema(CreateBaseSchema)
export const createCategorySchema = patchModelSchema(CreateCategorySchema)
export const createPostSchema = patchModelSchema(CreatePostSchema).extend({
  authorId: z.string().uuid(),
})
export const createProfileSchema = patchModelSchema(CreateProfileSchema)
export const createUserSchema = patchModelSchema(CreateUserSchema)
export const updateBaseSchema = patchModelSchema(UpdateBaseSchema)
export const updateCategorySchema = patchModelSchema(UpdateCategorySchema)
export const updatePostSchema = patchModelSchema(UpdatePostSchema)
export const updateProfileSchema = patchModelSchema(UpdateProfileSchema)
export const updateUserSchema = patchModelSchema(UpdateUserSchema)
