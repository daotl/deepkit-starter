import { z } from 'zod'
import { PostCreateInputObjectSchema } from './objects/PostCreateInput.schema'

export const PostCreateOneSchema = z.object({
  data: PostCreateInputObjectSchema,
})
