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
    posts: z.array(postSchema),
    name: z.string().optional().nullable(),
  }),
)

export const postSchema: z.ZodSchema<Post> = z.lazy(() =>
  baseSchema.extend({
    categories: z.array(categorySchema),
    author: userSchema,
    title: z.string(),
    content: z.string(),
    published: z.boolean(),
  }),
)

export const profileSchema: z.ZodSchema<Profile> = z.lazy(() =>
  baseSchema.extend({
    user: z.array(userSchema),
    bio: z.string().optional().nullable(),
  }),
)

export const userSchema: z.ZodSchema<User> = z.lazy(() =>
  baseSchema.extend({
    profile: profileSchema.optional().nullable(),
    posts: z.array(postSchema),
    email: z.string(),
    name: z.string(),
    role: roleSchema,
  }),
)