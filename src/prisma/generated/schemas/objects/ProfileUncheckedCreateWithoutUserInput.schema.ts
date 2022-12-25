import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z
  .object({
    id: z.number().optional(),
    bio: z.string().optional().nullable(),
  })
  .strict()

export const ProfileUncheckedCreateWithoutUserInputObjectSchema = Schema
