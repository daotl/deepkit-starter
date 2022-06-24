import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostUpdateWithoutCategoriesInput } from "../inputs/PostUpdateWithoutCategoriesInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostUpdateWithWhereUniqueWithoutCategoriesInput", {
  isAbstract: true
})
export class PostUpdateWithWhereUniqueWithoutCategoriesInput {
  @TypeGraphQL.Field(_type => PostWhereUniqueInput, {
    nullable: false
  })
  where!: PostWhereUniqueInput;

  @TypeGraphQL.Field(_type => PostUpdateWithoutCategoriesInput, {
    nullable: false
  })
  data!: PostUpdateWithoutCategoriesInput;
}
