import type { Types } from '@cwqt/refract'
import { DateTime, Default, Mixin, UpdatedAt } from '@cwqt/refract'

/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */

export const Timestamps = Mixin()
  .Field('createdAt', DateTime(Default('now()')))
  .Field('updatedAt', DateTime(UpdatedAt)) as unknown as Types.Mixin

export default []
