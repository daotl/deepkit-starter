import { z } from 'zod'
import { PostCreateWithoutCategoriesInputObjectSchema } from './PostCreateWithoutCategoriesInput.schema'
import { PostUncheckedCreateWithoutCategoriesInputObjectSchema } from './PostUncheckedCreateWithoutCategoriesInput.schema'
import { PostCreateOrConnectWithoutCategoriesInputObjectSchema } from './PostCreateOrConnectWithoutCategoriesInput.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateNestedManyWithoutCategoriesInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => PostCreateWithoutCategoriesInputObjectSchema),
        z.lazy(() => PostCreateWithoutCategoriesInputObjectSchema).array(),
        z.lazy(() => PostUncheckedCreateWithoutCategoriesInputObjectSchema),
        z
          .lazy(() => PostUncheckedCreateWithoutCategoriesInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => PostCreateOrConnectWithoutCategoriesInputObjectSchema),
        z
          .lazy(() => PostCreateOrConnectWithoutCategoriesInputObjectSchema)
          .array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputObjectSchema),
        z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const PostCreateNestedManyWithoutCategoriesInputObjectSchema = Schema
