import { t, publicProcedure } from "./helpers/createRouter";
import { CategoryFindUniqueSchema } from "../schemas/findUniqueCategory.schema";
import { CategoryFindFirstSchema } from "../schemas/findFirstCategory.schema";
import { CategoryFindManySchema } from "../schemas/findManyCategory.schema";
import { CategoryCreateOneSchema } from "../schemas/createOneCategory.schema";
import { CategoryCreateManySchema } from "../schemas/createManyCategory.schema";
import { CategoryDeleteOneSchema } from "../schemas/deleteOneCategory.schema";
import { CategoryUpdateOneSchema } from "../schemas/updateOneCategory.schema";
import { CategoryDeleteManySchema } from "../schemas/deleteManyCategory.schema";
import { CategoryUpdateManySchema } from "../schemas/updateManyCategory.schema";
import { CategoryUpsertSchema } from "../schemas/upsertOneCategory.schema";
import { CategoryAggregateSchema } from "../schemas/aggregateCategory.schema";
import { CategoryGroupBySchema } from "../schemas/groupByCategory.schema";

export const categoriesRouter = t.router({
  aggregateCategory: publicProcedure
    .input(CategoryAggregateSchema)
    .query(async ({ ctx, input }) => {
      const aggregateCategory = await ctx.prisma.category.aggregate(input);
      return aggregateCategory;
    }),
  createManyCategory: publicProcedure
    .input(CategoryCreateManySchema)
    .mutation(async ({ ctx, input }) => {
      const createManyCategory = await ctx.prisma.category.createMany(input);
      return createManyCategory;
    }),
  createOneCategory: publicProcedure
    .input(CategoryCreateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const createOneCategory = await ctx.prisma.category.create(input);
      return createOneCategory;
    }),
  deleteManyCategory: publicProcedure
    .input(CategoryDeleteManySchema)
    .mutation(async ({ ctx, input }) => {
      const deleteManyCategory = await ctx.prisma.category.deleteMany(input);
      return deleteManyCategory;
    }),
  deleteOneCategory: publicProcedure
    .input(CategoryDeleteOneSchema)
    .mutation(async ({ ctx, input }) => {
      const deleteOneCategory = await ctx.prisma.category.delete(input);
      return deleteOneCategory;
    }),
  findFirstCategory: publicProcedure
    .input(CategoryFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstCategory = await ctx.prisma.category.findFirst(input);
      return findFirstCategory;
    }),
  findFirstCategoryOrThrow: publicProcedure
    .input(CategoryFindFirstSchema)
    .query(async ({ ctx, input }) => {
      const findFirstCategoryOrThrow = await ctx.prisma.category.findFirstOrThrow(input);
      return findFirstCategoryOrThrow;
    }),
  findManyCategory: publicProcedure
    .input(CategoryFindManySchema)
    .query(async ({ ctx, input }) => {
      const findManyCategory = await ctx.prisma.category.findMany(input);
      return findManyCategory;
    }),
  findUniqueCategory: publicProcedure
    .input(CategoryFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniqueCategory = await ctx.prisma.category.findUnique(input);
      return findUniqueCategory;
    }),
  findUniqueCategoryOrThrow: publicProcedure
    .input(CategoryFindUniqueSchema)
    .query(async ({ ctx, input }) => {
      const findUniqueCategoryOrThrow = await ctx.prisma.category.findUniqueOrThrow(input);
      return findUniqueCategoryOrThrow;
    }),
  groupByCategory: publicProcedure
    .input(CategoryGroupBySchema)
    .query(async ({ ctx, input }) => {
      const groupByCategory = await ctx.prisma.category.groupBy(input);
      return groupByCategory;
    }),
  updateManyCategory: publicProcedure
    .input(CategoryUpdateManySchema)
    .mutation(async ({ ctx, input }) => {
      const updateManyCategory = await ctx.prisma.category.updateMany(input);
      return updateManyCategory;
    }),
  updateOneCategory: publicProcedure
    .input(CategoryUpdateOneSchema)
    .mutation(async ({ ctx, input }) => {
      const updateOneCategory = await ctx.prisma.category.update(input);
      return updateOneCategory;
    }),
  upsertOneCategory: publicProcedure
    .input(CategoryUpsertSchema)
    .mutation(async ({ ctx, input }) => {
      const upsertOneCategory = await ctx.prisma.category.upsert(input);
      return upsertOneCategory;
    }),

})
