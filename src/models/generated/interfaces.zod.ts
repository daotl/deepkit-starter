// Generated by ts-to-zod
import { z } from 'zod'
import { Category, Post, Profile, User } from './interfaces'

export const stdBaseObjectSchema = z.object({
  id: z.string(),
})

export const stdObjectSchema = stdBaseObjectSchema

export const baseSchema = stdObjectSchema.extend({
  createdAt: z.date(),
})

export const roleSchema = z.union([z.literal('user'), z.literal('admin')])

export const categorySchema: z.ZodSchema<Category> = z.lazy(() =>
  baseSchema.extend({
    name: z.string().optional().nullable(),
    posts: z.array(postSchema),
  }),
)

export const postSchema: z.ZodSchema<Post> = z.lazy(() =>
  baseSchema.extend({
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
    categories: z.array(categorySchema),
    author: userSchema,
  }),
)

export const profileSchema: z.ZodSchema<Profile> = z.lazy(() =>
  baseSchema.extend({
    bio: z.string().optional().nullable(),
    user: z.array(userSchema),
  }),
)

export const userSchema: z.ZodSchema<User> = z.lazy(() =>
  baseSchema.extend({
    email: z.string(),
    name: z.string(),
    role: roleSchema,
    profile: profileSchema.optional().nullable(),
    posts: z.array(postSchema),
  }),
)
