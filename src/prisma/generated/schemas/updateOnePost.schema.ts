import { z } from 'zod'
import { PostUpdateInputObjectSchema } from './objects/PostUpdateInput.schema'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'

export const PostUpdateOneSchema = z.object({
  data: PostUpdateInputObjectSchema,
  where: PostWhereUniqueInputObjectSchema,
})
