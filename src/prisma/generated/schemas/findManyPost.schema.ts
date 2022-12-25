import { z } from 'zod'
import { PostWhereInputObjectSchema } from './objects/PostWhereInput.schema'
import { PostOrderByWithRelationInputObjectSchema } from './objects/PostOrderByWithRelationInput.schema'
import { PostWhereUniqueInputObjectSchema } from './objects/PostWhereUniqueInput.schema'
import { PostScalarFieldEnumSchema } from './enums/PostScalarFieldEnum.schema'

export const PostFindManySchema = z.object({
  where: PostWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      PostOrderByWithRelationInputObjectSchema,
      PostOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  cursor: PostWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(PostScalarFieldEnumSchema).optional(),
})
