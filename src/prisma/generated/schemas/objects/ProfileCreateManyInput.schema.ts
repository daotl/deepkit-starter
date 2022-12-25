import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCreateManyInput> = z
  .object({
    id: z.number().optional(),
    bio: z.string().optional().nullable(),
    userId: z.number(),
  })
  .strict()

export const ProfileCreateManyInputObjectSchema = Schema
