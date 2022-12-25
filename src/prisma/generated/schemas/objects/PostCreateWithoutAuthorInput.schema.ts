import { z } from 'zod'
import { CategoryCreateNestedManyWithoutPostsInputObjectSchema } from './CategoryCreateNestedManyWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateWithoutAuthorInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    categories: z
      .lazy(() => CategoryCreateNestedManyWithoutPostsInputObjectSchema)
      .optional(),
  })
  .strict()

export const PostCreateWithoutAuthorInputObjectSchema = Schema
