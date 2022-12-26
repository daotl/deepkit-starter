import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './ProfileOrderByWithRelationInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    posts: z
      .lazy(() => PostOrderByRelationAggregateInputObjectSchema)
      .optional(),
    profile: z
      .lazy(() => ProfileOrderByWithRelationInputObjectSchema)
      .optional(),
  })
  .strict()

export const UserOrderByWithRelationInputObjectSchema = Schema