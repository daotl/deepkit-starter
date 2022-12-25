import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    bio: z.literal(true).optional(),
    userId: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict()

export const ProfileCountAggregateInputObjectSchema = Schema
