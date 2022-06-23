import { Default, Id, Int, OneToMany, String } from '@cwqt/refract'

import { Timestamps } from './mixins.js'
import { Category, Post } from './models.js'

Category.Field('id', Int(Id, Default('autoincrement()')))
  .Mixin(Timestamps)
  .Field('name', String())
  .Relation('posts', OneToMany(Post))

export default []
