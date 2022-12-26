import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryCreateWithoutPostsInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
  })
  .strict()

export const CategoryCreateWithoutPostsInputObjectSchema = Schema