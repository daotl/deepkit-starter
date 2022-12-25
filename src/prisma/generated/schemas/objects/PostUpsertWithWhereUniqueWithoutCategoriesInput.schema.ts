import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithoutCategoriesInputObjectSchema } from './PostUpdateWithoutCategoriesInput.schema'
import { PostUncheckedUpdateWithoutCategoriesInputObjectSchema } from './PostUncheckedUpdateWithoutCategoriesInput.schema'
import { PostCreateWithoutCategoriesInputObjectSchema } from './PostCreateWithoutCategoriesInput.schema'
import { PostUncheckedCreateWithoutCategoriesInputObjectSchema } from './PostUncheckedCreateWithoutCategoriesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutCategoriesInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutCategoriesInputObjectSchema),
        z.lazy(() => PostUncheckedUpdateWithoutCategoriesInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutCategoriesInputObjectSchema),
        z.lazy(() => PostUncheckedCreateWithoutCategoriesInputObjectSchema),
      ]),
    })
    .strict()

export const PostUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema =
  Schema
