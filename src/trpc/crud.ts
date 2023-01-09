import { z } from 'zod'

export const zListInput = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
})
