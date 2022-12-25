import { z } from 'zod'
import { CategoryUncheckedCreateNestedManyWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateNestedManyWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    categories: z
      .lazy(
        () => CategoryUncheckedCreateNestedManyWithoutPostsInputObjectSchema,
      )
      .optional(),
  })
  .strict()

export const PostUncheckedCreateWithoutAuthorInputObjectSchema = Schema
