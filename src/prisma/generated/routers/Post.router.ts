import { t, publicProcedure } from "./helpers/createRouter";
import { PostFindUniqueSchema } from "../schemas/findUniquePost.schema";
import { PostFindFirstSchema } from "../schemas/findFirstPost.schema";
import { PostFindManySchema } from "../schemas/findManyPost.schema";
import { PostCreateOneSchema } from "../schemas/createOnePost.schema";
import { PostCreateManySchema } from "../schemas/createManyPost.schema";
import { PostDeleteOneSchema } from "../schemas/deleteOnePost.schema";
import { PostUpdateOneSchema } from "../schemas/updateOnePost.schema";
import { PostDeleteManySchema } from "../schemas/deleteManyPost.schema";
import { PostUpdateManySchema } from "../schemas/updateManyPost.schema";
import { PostUpsertSchema } from "../schemas/upsertOnePost.schema";
import { PostAggregateSchema } from "../schemas/aggregatePost.schema";
import { PostGroupBySchema } from "../schemas/groupByPost.schema";

export const postsRouter = t.router({
  aggregatePost: publicProcedure
    .input(PostAggregateSchema)
    .query(async ({ ctx, input }) => {
      const aggregatePost = await ctx.prisma.post.aggregate(input);
      return aggregatePost;
    }),
  createManyPost: publicProcedure
    .input(PostCreateManySchema)
    .mutation(async ({ ctx, input }) => {
      const createManyPost = await ctx.prisma.post.createMany(input);
      return createManyPost;
    }),
  createOnePost: publicProcedure
    .input(PostCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const createOnePost = await ctx.prisma.post.create(input);
      return createOnePost;
    }),
  deleteManyPost: publicProcedure
    .input(PostDeleteManySchema)
    .mutation(async ({ ctx, input }) => {
      const deleteManyPost = await ctx.prisma.post.deleteMany(input);
      return deleteManyPost;
    }),
  deleteOnePost: publicProcedure
    .input(PostDeleteOneSchema)
    .mutation(async ({ ctx, input }) => {
      const deleteOnePost = await ctx.prisma.post.delete(input);
      return deleteOnePost;
    }),
  findFirstPost: publicProcedure
    .input(PostFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstPost = await ctx.prisma.post.findFirst(input);
      return findFirstPost;
    }),
  findFirstPostOrThrow: publicProcedure
    .input(PostFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstPostOrThrow = await ctx.prisma.post.findFirstOrThrow(input);
      return findFirstPostOrThrow;
    }),
  findManyPost: publicProcedure
    .input(PostFindManySchema)
    .query(async ({ ctx, input }) => {
      const findManyPost = await ctx.prisma.post.findMany(input);
      return findManyPost;
    }),
  findUniquePost: publicProcedure
    .input(PostFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniquePost = await ctx.prisma.post.findUnique(input);
      return findUniquePost;
    }),
  findUniquePostOrThrow: publicProcedure
    .input(PostFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniquePostOrThrow = await ctx.prisma.post.findUniqueOrThrow(input);
      return findUniquePostOrThrow;
    }),
  groupByPost: publicProcedure
    .input(PostGroupBySchema)
    .query(async ({ ctx, input }) => {
      const groupByPost = await ctx.prisma.post.groupBy(input);
      return groupByPost;
    }),
  updateManyPost: publicProcedure
    .input(PostUpdateManySchema)
    .mutation(async ({ ctx, input }) => {
      const updateManyPost = await ctx.prisma.post.updateMany(input);
      return updateManyPost;
    }),
  updateOnePost: publicProcedure
    .input(PostUpdateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const updateOnePost = await ctx.prisma.post.update(input);
      return updateOnePost;
    }),
  upsertOnePost: publicProcedure
    .input(PostUpsertSchema)
    .mutation(async ({ ctx, input }) => {
      const upsertOnePost = await ctx.prisma.post.upsert(input);
      return upsertOnePost;
    }),

})
