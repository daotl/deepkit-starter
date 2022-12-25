import { z } from 'zod'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'
import { ProfileCreateInputObjectSchema } from './objects/ProfileCreateInput.schema'
import { ProfileUpdateInputObjectSchema } from './objects/ProfileUpdateInput.schema'

export const ProfileUpsertSchema = z.object({
  where: ProfileWhereUniqueInputObjectSchema,
  create: ProfileCreateInputObjectSchema,
  update: ProfileUpdateInputObjectSchema,
})
