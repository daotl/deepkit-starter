import { z } from 'zod'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryUpdateWithoutPostsInputObjectSchema } from './CategoryUpdateWithoutPostsInput.schema'
import { CategoryUncheckedUpdateWithoutPostsInputObjectSchema } from './CategoryUncheckedUpdateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryUpdateWithWhereUniqueWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CategoryUpdateWithoutPostsInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutPostsInputObjectSchema),
      ]),
    })
    .strict()

export const CategoryUpdateWithWhereUniqueWithoutPostsInputObjectSchema = Schema
