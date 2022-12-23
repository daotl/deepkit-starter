import type { Types } from '@cwqt/refract'
import { DateTime, Default, Mixin, UpdatedAt } from '@cwqt/refract'

export const Timestamps = Mixin()
  .Field('createdAt', DateTime(Default('now()')))
  .Field('updatedAt', DateTime(UpdatedAt)) as unknown as Types.Mixin

export default []
