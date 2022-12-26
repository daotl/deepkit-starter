import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    userId: z.number().optional(),
  })
  .strict()

export const ProfileWhereUniqueInputObjectSchema = Schema