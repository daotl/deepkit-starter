import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutCategoriesInputObjectSchema } from './PostUpdateWithoutCategoriesInput.schema'
import { PostUncheckedUpdateWithoutCategoriesInputObjectSchema } from './PostUncheckedUpdateWithoutCategoriesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutCategoriesInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutCategoriesInputObjectSchema),
        z.lazy(() => PostUncheckedUpdateWithoutCategoriesInputObjectSchema),
      ]),
    })
    .strict()

export const PostUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema =
  Schema
