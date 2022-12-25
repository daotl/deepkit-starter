import { z } from 'zod'
import { RoleSchema } from '../enums/Role.schema'
import { PostCreateNestedManyWithoutAuthorInputObjectSchema } from './PostCreateNestedManyWithoutAuthorInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutAuthorInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserCreateWithoutProfileInputObjectSchema = Schema
