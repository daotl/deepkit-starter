import { z } from 'zod'

import { CreatePostSchema, UpdatePostSchema } from './generated/zod'

export * from './generated/zod'

export const zCreatePost = CreatePostSchema.omit({
  createdAt: true,
}).extend({
  authorId: z.string().uuid(),
})

export const zUpdatePost = UpdatePostSchema.omit({
  createdAt: true,
})
