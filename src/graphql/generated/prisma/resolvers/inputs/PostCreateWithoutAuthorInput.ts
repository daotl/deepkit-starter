import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryCreateNestedManyWithoutPostsInput } from "../inputs/CategoryCreateNestedManyWithoutPostsInput";

@TypeGraphQL.InputType("PostCreateWithoutAuthorInput", {
  isAbstract: true
})
export class PostCreateWithoutAuthorInput {
  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  content!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  published?: boolean | undefined;

  @TypeGraphQL.Field(_type => CategoryCreateNestedManyWithoutPostsInput, {
    nullable: true
  })
  categories?: CategoryCreateNestedManyWithoutPostsInput | undefined;
}
