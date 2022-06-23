import {
  Default,
  Fields,
  Id,
  Int,
  Nullable,
  OneToOne,
  References,
  String,
  Unique,
} from '@cwqt/refract'

import { Profile, User } from './models.js'

Profile.Field('id', Int(Id, Default('autoincrement()')))
  .Field('bio', String(Nullable))
  .Relation('user', OneToOne(User, Fields('userId'), References('id')))
  .Field('userId', Int(Unique))

export default []
