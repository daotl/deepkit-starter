import { z } from 'zod'

export const CategoryScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'name',
])
