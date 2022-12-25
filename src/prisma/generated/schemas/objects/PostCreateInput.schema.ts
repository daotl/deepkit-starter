import { z } from 'zod'
import { UserCreateNestedOneWithoutPostsInputObjectSchema } from './UserCreateNestedOneWithoutPostsInput.schema'
import { CategoryCreateNestedManyWithoutPostsInputObjectSchema } from './CategoryCreateNestedManyWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
    author: z
      .lazy(() => UserCreateNestedOneWithoutPostsInputObjectSchema)
      .optional(),
    categories: z
      .lazy(() => CategoryCreateNestedManyWithoutPostsInputObjectSchema)
      .optional(),
  })
  .strict()

export const PostCreateInputObjectSchema = Schema
