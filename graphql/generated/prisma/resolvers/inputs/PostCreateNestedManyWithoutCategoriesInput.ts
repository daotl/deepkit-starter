import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateOrConnectWithoutCategoriesInput } from "../inputs/PostCreateOrConnectWithoutCategoriesInput";
import { PostCreateWithoutCategoriesInput } from "../inputs/PostCreateWithoutCategoriesInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostCreateNestedManyWithoutCategoriesInput", {
  isAbstract: true
})
export class PostCreateNestedManyWithoutCategoriesInput {
  @TypeGraphQL.Field(_type => [PostCreateWithoutCategoriesInput], {
    nullable: true
  })
  create?: PostCreateWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostCreateOrConnectWithoutCategoriesInput], {
    nullable: true
  })
  connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostWhereUniqueInput], {
    nullable: true
  })
  connect?: PostWhereUniqueInput[] | undefined;
}
