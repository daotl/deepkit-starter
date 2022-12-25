import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { ProfileCountOrderByAggregateInputObjectSchema } from './ProfileCountOrderByAggregateInput.schema'
import { ProfileAvgOrderByAggregateInputObjectSchema } from './ProfileAvgOrderByAggregateInput.schema'
import { ProfileMaxOrderByAggregateInputObjectSchema } from './ProfileMaxOrderByAggregateInput.schema'
import { ProfileMinOrderByAggregateInputObjectSchema } from './ProfileMinOrderByAggregateInput.schema'
import { ProfileSumOrderByAggregateInputObjectSchema } from './ProfileSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    bio: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => ProfileCountOrderByAggregateInputObjectSchema)
      .optional(),
    _avg: z.lazy(() => ProfileAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => ProfileMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => ProfileMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => ProfileSumOrderByAggregateInputObjectSchema).optional(),
  })
  .strict()

export const ProfileOrderByWithAggregationInputObjectSchema = Schema
