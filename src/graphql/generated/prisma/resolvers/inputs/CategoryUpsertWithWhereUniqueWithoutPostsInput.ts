import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryCreateWithoutPostsInput } from "../inputs/CategoryCreateWithoutPostsInput";
import { CategoryUpdateWithoutPostsInput } from "../inputs/CategoryUpdateWithoutPostsInput";
import { CategoryWhereUniqueInput } from "../inputs/CategoryWhereUniqueInput";

@TypeGraphQL.InputType("CategoryUpsertWithWhereUniqueWithoutPostsInput", {
  isAbstract: true
})
export class CategoryUpsertWithWhereUniqueWithoutPostsInput {
  @TypeGraphQL.Field(_type => CategoryWhereUniqueInput, {
    nullable: false
  })
  where!: CategoryWhereUniqueInput;

  @TypeGraphQL.Field(_type => CategoryUpdateWithoutPostsInput, {
    nullable: false
  })
  update!: CategoryUpdateWithoutPostsInput;

  @TypeGraphQL.Field(_type => CategoryCreateWithoutPostsInput, {
    nullable: false
  })
  create!: CategoryCreateWithoutPostsInput;
}
