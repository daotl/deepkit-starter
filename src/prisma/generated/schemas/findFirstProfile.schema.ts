import { z } from 'zod'
import { ProfileWhereInputObjectSchema } from './objects/ProfileWhereInput.schema'
import { ProfileOrderByWithRelationInputObjectSchema } from './objects/ProfileOrderByWithRelationInput.schema'
import { ProfileWhereUniqueInputObjectSchema } from './objects/ProfileWhereUniqueInput.schema'
import { ProfileScalarFieldEnumSchema } from './enums/ProfileScalarFieldEnum.schema'

export const ProfileFindFirstSchema = z.object({
  where: ProfileWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      ProfileOrderByWithRelationInputObjectSchema,
      ProfileOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  cursor: ProfileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ProfileScalarFieldEnumSchema).optional(),
})
