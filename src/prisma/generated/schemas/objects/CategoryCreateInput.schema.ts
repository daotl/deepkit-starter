import { z } from 'zod'
import { PostCreateNestedManyWithoutCategoriesInputObjectSchema } from './PostCreateNestedManyWithoutCategoriesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryCreateInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    posts: z
      .lazy(() => PostCreateNestedManyWithoutCategoriesInputObjectSchema)
      .optional(),
  })
  .strict()

export const CategoryCreateInputObjectSchema = Schema
