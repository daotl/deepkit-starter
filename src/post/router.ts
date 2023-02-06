import { e, EdgedbClient } from '~/edgedb'
import * as E from '~/edgedb'
import { createPostSchema, updatePostSchema } from '~/models/zod'
import { p, t, zIdInput, zListInput } from '~/trpc'

export class Person {
  constructor(
    private name: string,
    private email: string,
    private motto: string,
  ) {}
}

export class PostRouter {
  constructor(private edgedb: EdgedbClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router = () =>
    t.router({
      count: this.count,
      listWithCount: this.listWithCount,
      list: this.list,
      get: this.get,
      create: this.create,
      update: this.update,
      delete: this.delete,
    })

  count = p.optional.input(zListInput).query(({ input }) =>
    e
      .count(
        e.select(e.Post, (_p) => ({
          ...input,
        })),
      )
      .run(this.edgedb),
  )

  list = p.optional.input(zListInput).query(({ input }) =>
    e
      .select(e.Post, (_p) => ({
        ...input,
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  listWithCount = p.optional.input(zListInput).query(({ input }) => ({
    data: E.selectCount(e.Post, (_p) => ({
      ...input,
      ...e.Post['*'],
    })).run(this.edgedb),
  }))

  get = p.optional.input(zIdInput).query(({ input: { id } }) =>
    e
      .select(e.Post, (p) => ({
        filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  create = p.optional.input(createPostSchema).mutation(async ({ input }) =>
    e
      .insert(e.Post, {
        ...input,
        author: e.select(e.User, (u) => ({
          filter_single: e.op(u.id, '=', e.cast(e.uuid, input.authorId)),
        })),
      })
      .run(this.edgedb),
  )

  update = p.optional.input(updatePostSchema).mutation(async ({ input }) =>
    e
      .update(e.Post, () => ({
        set: input,
      }))
      .run(this.edgedb),
  )

  delete = p.optional.input(zIdInput).mutation(async ({ input: { id } }) =>
    e
      .delete(e.Post, (p) => ({
        filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
      }))
      .run(this.edgedb),
  )
}
