import { z } from 'zod'
import { ProfileCreateInputObjectSchema } from './objects/ProfileCreateInput.schema'

export const ProfileCreateOneSchema = z.object({
  data: ProfileCreateInputObjectSchema,
})
