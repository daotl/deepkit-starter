import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z
  .object({
    id: z.number().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
  })
  .strict()

export const PostCreateManyAuthorInputObjectSchema = Schema
