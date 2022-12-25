import { z } from 'zod'
import { RoleSchema } from '../enums/Role.schema'
import { ProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './ProfileUncheckedCreateNestedOneWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string(),
    name: z.string().optional().nullable(),
    role: z.lazy(() => RoleSchema).optional(),
    profile: z
      .lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserUncheckedCreateWithoutPostsInputObjectSchema = Schema
