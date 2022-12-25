import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostCreateWithoutCategoriesInputObjectSchema } from './PostCreateWithoutCategoriesInput.schema'
import { PostUncheckedCreateWithoutCategoriesInputObjectSchema } from './PostUncheckedCreateWithoutCategoriesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateOrConnectWithoutCategoriesInput> = z
  .object({
    where: z.lazy(() => PostWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => PostCreateWithoutCategoriesInputObjectSchema),
      z.lazy(() => PostUncheckedCreateWithoutCategoriesInputObjectSchema),
    ]),
  })
  .strict()

export const PostCreateOrConnectWithoutCategoriesInputObjectSchema = Schema
