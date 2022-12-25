import { z } from 'zod'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryCreateWithoutPostsInputObjectSchema } from './CategoryCreateWithoutPostsInput.schema'
import { CategoryUncheckedCreateWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutPostsInput> = z
  .object({
    where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutPostsInputObjectSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict()

export const CategoryCreateOrConnectWithoutPostsInputObjectSchema = Schema
