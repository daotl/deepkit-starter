import { z } from 'zod'
import { RoleSchema } from '../enums/Role.schema'
import { ProfileCreateNestedOneWithoutUserInputObjectSchema } from './ProfileCreateNestedOneWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    profile: z
      .lazy(() => ProfileCreateNestedOneWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserCreateWithoutPostsInputObjectSchema = Schema
