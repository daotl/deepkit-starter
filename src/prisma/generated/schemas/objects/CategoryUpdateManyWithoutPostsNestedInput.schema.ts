import { z } from 'zod'
import { CategoryCreateWithoutPostsInputObjectSchema } from './CategoryCreateWithoutPostsInput.schema'
import { CategoryUncheckedCreateWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateWithoutPostsInput.schema'
import { CategoryCreateOrConnectWithoutPostsInputObjectSchema } from './CategoryCreateOrConnectWithoutPostsInput.schema'
import { CategoryUpsertWithWhereUniqueWithoutPostsInputObjectSchema } from './CategoryUpsertWithWhereUniqueWithoutPostsInput.schema'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'
import { CategoryUpdateWithWhereUniqueWithoutPostsInputObjectSchema } from './CategoryUpdateWithWhereUniqueWithoutPostsInput.schema'
import { CategoryUpdateManyWithWhereWithoutPostsInputObjectSchema } from './CategoryUpdateManyWithWhereWithoutPostsInput.schema'
import { CategoryScalarWhereInputObjectSchema } from './CategoryScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryUpdateManyWithoutPostsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutPostsInputObjectSchema),
        z.lazy(() => CategoryCreateWithoutPostsInputObjectSchema).array(),
        z.lazy(() => CategoryUncheckedCreateWithoutPostsInputObjectSchema),
        z
          .lazy(() => CategoryUncheckedCreateWithoutPostsInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CategoryCreateOrConnectWithoutPostsInputObjectSchema),
        z
          .lazy(() => CategoryCreateOrConnectWithoutPostsInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => CategoryUpsertWithWhereUniqueWithoutPostsInputObjectSchema,
        ),
        z
          .lazy(
            () => CategoryUpsertWithWhereUniqueWithoutPostsInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    set: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => CategoryWhereUniqueInputObjectSchema),
        z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => CategoryUpdateWithWhereUniqueWithoutPostsInputObjectSchema,
        ),
        z
          .lazy(
            () => CategoryUpdateWithWhereUniqueWithoutPostsInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => CategoryUpdateManyWithWhereWithoutPostsInputObjectSchema),
        z
          .lazy(() => CategoryUpdateManyWithWhereWithoutPostsInputObjectSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CategoryScalarWhereInputObjectSchema),
        z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict()

export const CategoryUpdateManyWithoutPostsNestedInputObjectSchema = Schema
