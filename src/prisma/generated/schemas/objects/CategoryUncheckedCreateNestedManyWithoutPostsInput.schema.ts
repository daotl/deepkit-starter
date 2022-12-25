import { z } from 'zod'
import { CategoryCreateWithoutPostsInputObjectSchema } from './CategoryCreateWithoutPostsInput.schema'
import { CategoryUncheckedCreateWithoutPostsInputObjectSchema } from './CategoryUncheckedCreateWithoutPostsInput.schema'
import { CategoryCreateOrConnectWithoutPostsInputObjectSchema } from './CategoryCreateOrConnectWithoutPostsInput.schema'
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CategoryUncheckedCreateNestedManyWithoutPostsInput> =
  z
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
      connect: z
        .union([
          z.lazy(() => CategoryWhereUniqueInputObjectSchema),
          z.lazy(() => CategoryWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict()

export const CategoryUncheckedCreateNestedManyWithoutPostsInputObjectSchema =
  Schema
