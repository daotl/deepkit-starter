import { z } from 'zod'
import { ProfileUpdateInputObjectSchema } from './objects/ProfileUpdateInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'

export const ProfileUpdateOneSchema = z.object({
  data: ProfileUpdateInputObjectSchema,
  where: ProfileWhereUniqueInputObjectSchema,
})
