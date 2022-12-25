import { z } from 'zod'
import { PostCreateManyInputObjectSchema } from './objects/PostCreateManyInput.schema'

export const PostCreateManySchema = z.object({
  data: PostCreateManyInputObjectSchema,
})
