import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryScalarWhereInput } from "../inputs/CategoryScalarWhereInput";
import { CategoryUpdateManyMutationInput } from "../inputs/CategoryUpdateManyMutationInput";

@TypeGraphQL.InputType("CategoryUpdateManyWithWhereWithoutPostsInput", {
  isAbstract: true
})
export class CategoryUpdateManyWithWhereWithoutPostsInput {
  @TypeGraphQL.Field(_type => CategoryScalarWhereInput, {
    nullable: false
  })
  where!: CategoryScalarWhereInput;

  @TypeGraphQL.Field(_type => CategoryUpdateManyMutationInput, {
    nullable: false
  })
  data!: CategoryUpdateManyMutationInput;
}
