import { z } from 'zod'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryUpdateWithoutPostsInputObjectSchema } from './CategoryUpdateWithoutPostsInput.schema'
import { CategoryUncheckedUpdateWithoutPostsInputObjectSchema } from './CategoryUncheckedUpdateWithoutPostsInput.schema'
import { CategoryCreateWithoutPostsInputObjectSchema } from './CategoryCreateWithoutPostsInput.schema'
import { CategoryUncheckedCreateWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateWithoutPostsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryUpsertWithWhereUniqueWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CategoryUpdateWithoutPostsInputObjectSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutPostsInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CategoryCreateWithoutPostsInputObjectSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutPostsInputObjectSchema),
      ]),
    })
    .strict()

export const CategoryUpsertWithWhereUniqueWithoutPostsInputObjectSchema = Schema
