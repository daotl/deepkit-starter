import { z } from 'zod'
import { UserCreateNestedOneWithoutProfileInputObjectSchema } from './UserCreateNestedOneWithoutProfileInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateInput> = z
  .object({
    bio: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutProfileInputObjectSchema),
  })
  .strict()

export const ProfileCreateInputObjectSchema = Schema
