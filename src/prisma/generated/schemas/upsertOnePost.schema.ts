import { z } from 'zod'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'
import { PostCreateInputObjectSchema } from './objects/PostCreateInput.schema'
import { PostUpdateInputObjectSchema } from './objects/PostUpdateInput.schema'

export const PostUpsertSchema = z.object({
  where: PostWhereUniqueInputObjectSchema,
  create: PostCreateInputObjectSchema,
  update: PostUpdateInputObjectSchema,
})
