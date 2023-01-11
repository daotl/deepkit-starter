import { z } from 'zod'

import { e, EdgedbClient, EdgedbUtil } from '~/edgedb'
import { createPostSchema, updatePostSchema } from '~/models/zod'
import { p, t, zListInput } from '~/trpc'

export class Person {
  constructor(
    private name: string,
    private email: string,
    private motto: string,
  ) {}
}

export class PostRouter {
  constructor(private edgedb: EdgedbClient, private eu: EdgedbUtil) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router = () =>
    t.router({
      list: this.list,
      get: this.get,
      create: this.create,
      update: this.update,
      delete: this.delete,
    })

  list = p.public.input(zListInput).query(({ input }) =>
    e
      .select(e.Post, (_p) => ({
        ...input,
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  listWithCount = p.public.input(zListInput).query(({ input }) => ({
    data: this.eu.selectCount(e.Post, (_p) => ({
      ...input,
      ...e.Post['*'],
    })),
  }))

  get = p.public.input(z.string().uuid()).query(({ input: id }) =>
    e
      .select(e.Post, (p) => ({
        filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  create = p.public.input(createPostSchema).mutation(async ({ input }) =>
    e
      .insert(e.Post, {
        ...input,
        author: e.select(e.User, (u) => ({
          filter_single: e.op(u.id, '=', e.cast(e.uuid, input.authorId)),
        })),
      })
      .run(this.edgedb),
  )

  update = p.public.input(updatePostSchema).mutation(async ({ input }) =>
    e
      .update(e.Post, () => ({
        set: input,
      }))
      .run(this.edgedb),
  )

  delete = p.public.input(z.string().uuid()).mutation(async ({ input: id }) =>
    e
      .delete(e.Post, (p) => ({
        filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
      }))
      .run(this.edgedb),
  )
}
