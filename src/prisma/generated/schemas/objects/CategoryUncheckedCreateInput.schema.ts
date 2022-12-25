import { z } from 'zod'
import { PostUncheckedCreateNestedManyWithoutCategoriesInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutCategoriesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    posts: z
      .lazy(
        () => PostUncheckedCreateNestedManyWithoutCategoriesInputObjectSchema,
      )
      .optional(),
  })
  .strict()

export const CategoryUncheckedCreateInputObjectSchema = Schema
