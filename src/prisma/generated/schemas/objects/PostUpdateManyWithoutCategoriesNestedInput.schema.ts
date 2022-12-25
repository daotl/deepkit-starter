import { z } from 'zod'
import { PostCreateWithoutCategoriesInputObjectSchema } from './PostCreateWithoutCategoriesInput.schema'
import { PostUncheckedCreateWithoutCategoriesInputObjectSchema } from './PostUncheckedCreateWithoutCategoriesInput.schema'
import { PostCreateOrConnectWithoutCategoriesInputObjectSchema } from './PostCreateOrConnectWithoutCategoriesInput.schema'
import { PostUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutCategoriesInput.schema'
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'
import { PostUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutCategoriesInput.schema'
import { PostUpdateManyWithWhereWithoutCategoriesInputObjectSchema } from './PostUpdateManyWithWhereWithoutCategoriesInput.schema'
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostUpdateManyWithoutCategoriesNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(
          () => PostUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema,
        ),
        z
          .lazy(
            () => PostUpsertWithWhereUniqueWithoutCategoriesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => PostWhereUniqueInputObjectSchema),
        z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => PostWhereUniqueInputObjectSchema),
        z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => PostWhereUniqueInputObjectSchema),
        z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => PostWhereUniqueInputObjectSchema),
        z.lazy(() => PostWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => PostUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema,
        ),
        z
          .lazy(
            () => PostUpdateWithWhereUniqueWithoutCategoriesInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputObjectSchema),
        z
          .lazy(() => PostUpdateManyWithWhereWithoutCategoriesInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => PostScalarWhereInputObjectSchema),
        z.lazy(() => PostScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const PostUpdateManyWithoutCategoriesNestedInputObjectSchema = Schema
