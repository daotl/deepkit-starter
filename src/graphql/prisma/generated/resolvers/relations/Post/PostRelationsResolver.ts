import * as TypeGraphQL from "type-graphql";
import { Category } from "../../../models/Category";
import { Post } from "../../../models/Post";
import { User } from "../../../models/User";
import { PostCategoriesArgs } from "./args/PostCategoriesArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Post)
export class PostRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: true
  })
  async author(@TypeGraphQL.Root() post: Post, @TypeGraphQL.Ctx() ctx: any): Promise<User | null> {
    return getPrismaFromContext(ctx).post.findUnique({
      where: {
        id: post.id,
      },
    }).author({});
  }

  @TypeGraphQL.FieldResolver(_type => [Category], {
    nullable: false
  })
  async categories(@TypeGraphQL.Root() post: Post, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: PostCategoriesArgs): Promise<Category[]> {
    return getPrismaFromContext(ctx).post.findUnique({
      where: {
        id: post.id,
      },
    }).categories(args);
  }
}
