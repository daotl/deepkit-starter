import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateWithoutCategoriesInput } from "../inputs/PostCreateWithoutCategoriesInput";
import { PostUpdateWithoutCategoriesInput } from "../inputs/PostUpdateWithoutCategoriesInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostUpsertWithWhereUniqueWithoutCategoriesInput", {
  isAbstract: true
})
export class PostUpsertWithWhereUniqueWithoutCategoriesInput {
  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: false
  })
  where!: PostWhereUniqueInput;

  @TypeGraphQL.Field(_type => PostUpdateWithoutCategoriesInput, {
    nullable: false
  })
  update!: PostUpdateWithoutCategoriesInput;

  @TypeGraphQL.Field(_type => PostCreateWithoutCategoriesInput, {
    nullable: false
  })
  create!: PostCreateWithoutCategoriesInput;
}
