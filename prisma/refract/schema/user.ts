import {
  Default,
  Enum,
  Id,
  Int,
  Key,
  Nullable,
  OneToMany,
  OneToOne,
  String,
  Unique,
} from '@cwqt/refract'

import { Timestamps } from './mixins.js'
import { Post, Profile, User } from './models.js'

const Role = Enum('Role', Key('user'), Key('admin'))

User.Field('id', Int(Id, Default('autoincrement()')))
  .Mixin(Timestamps)
  .Field('email', String(Unique))
  .Field('name', String(Nullable))
  .Field('role', Role('user'))
  .Relation('posts', OneToMany(Post))
  .Relation('profile', OneToOne(Profile, Nullable))

export default [Role]
