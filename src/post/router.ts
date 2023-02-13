import { e, EdgedbClient } from '~/edgedb'
import * as E from '~/edgedb'
import { zCreatePostInput, zPostFilter, zUpdatePostInput } from '~/models/zod'
import { p, t, zIdInput, zListInput } from '~/trpc'

export const zPostListInput = zListInput.extend({
  filter: zPostFilter,
})

export class PostRouter {
  constructor(private edgedb: EdgedbClient) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router = () =>
    t.router({
      count: this.count,
      list: this.list,
      listWithTotal: this.listWithTotal,
      get: this.get,
      create: this.create,
      update: this.update,
      delete: this.delete,
    })

  count = p.optional.input(zPostListInput).query(({ input }) =>
    e
      .count(
        e.select(e.Post, (_p) => ({
          ...input,
          filter: E.filterPropsEqual(e.Post, input.filter),
        })),
      )
      .run(this.edgedb),
  )

  list = p.optional.input(zPostListInput).query(({ input }) =>
    e
      .select(e.Post, (_p) => ({
        ...input,
        filter: E.filterPropsEqual(e.Post, input.filter),
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  listWithTotal = p.optional.input(zPostListInput).query(({ input }) =>
    E.Post.selectWithTotal((_p) => ({
      ...input,
      filter: E.filterPropsEqual(e.Post, input.filter),
      ...e.Post['*'],
    })).run(this.edgedb),
  )

  get = p.optional.input(zIdInput).query(({ input: { id } }) =>
    e
      .select(e.Post, (p) => ({
        filter_single: e.op(p.id, '=', e.cast(e.uuid, id)),
        ...e.Post['*'],
      }))
      .run(this.edgedb),
  )

  create = p.optional.input(zCreatePostInput).mutation(async ({ input }) =>
    e
      .insert(e.Post, {
        ...input,
        author: e.select(e.User, (u) => ({
          filter_single: e.op(u.id, '=', e.cast(e.uuid, input.authorId)),
        })),
      })
      .run(this.edgedb),
  )

  update = p.optional.input(zUpdatePostInput).mutation(async ({ input }) =>
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
