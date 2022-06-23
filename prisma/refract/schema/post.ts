import {
  Boolean,
  Default,
  Fields,
  Id,
  Int,
  Limit,
  ManyToOne,
  Nullable,
  OneToMany,
  References,
  String,
} from '@cwqt/refract'

import { Timestamps } from './mixins.js'
import { Category, Post, User } from './models.js'

Post.Field('id', Int(Id, Default('autoincrement()')))
  .Mixin(Timestamps)
  .Field('title', String(Limit(255)))
  .Field('content', String())
  .Field('published', Boolean(Default(false)))
  .Relation(
    'author',
    ManyToOne(User, Fields('authorId'), References('id'), Nullable),
  )
  .Field('authorId', Int(Nullable))
  .Relation('categories', OneToMany(Category))
// .Raw(`@@map("comments")`)

export default []
