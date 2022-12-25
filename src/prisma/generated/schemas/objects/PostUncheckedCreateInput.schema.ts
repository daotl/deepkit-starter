import { z } from 'zod'
import { CategoryUncheckedCreateNestedManyWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateNestedManyWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedCreateInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    authorId: z.number().optional().nullable(),
    categories: z
      .lazy(
        () => CategoryUncheckedCreateNestedManyWithoutPostsInputObjectSchema,
      )
      .optional(),
  })
  .strict()

export const PostUncheckedCreateInputObjectSchema = Schema
