import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryCreateOrConnectWithoutPostsInput } from "../inputs/CategoryCreateOrConnectWithoutPostsInput";
import { CategoryCreateWithoutPostsInput } from "../inputs/CategoryCreateWithoutPostsInput";
import { CategoryWhereUniqueInput } from "../inputs/CategoryWhereUniqueInput";

@TypeGraphQL.InputType("CategoryCreateNestedManyWithoutPostsInput", {
  isAbstract: true
})
export class CategoryCreateNestedManyWithoutPostsInput {
  @TypeGraphQL.Field(_type => [CategoryCreateWithoutPostsInput], {
    nullable: true
  })
  create?: CategoryCreateWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryCreateOrConnectWithoutPostsInput], {
    nullable: true
  })
  connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryWhereUniqueInput], {
    nullable: true
  })
  connect?: CategoryWhereUniqueInput[] | undefined;
}
