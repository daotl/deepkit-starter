import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    email: z.literal(true).optional(),
    name: z.literal(true).optional(),
    role: z.literal(true).optional(),
  })
  .strict()

export const UserMaxAggregateInputObjectSchema = Schema
