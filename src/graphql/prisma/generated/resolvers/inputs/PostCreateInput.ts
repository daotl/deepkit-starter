import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryCreateNestedManyWithoutPostsInput } from "../inputs/CategoryCreateNestedManyWithoutPostsInput";
import { UserCreateNestedOneWithoutPostsInput } from "../inputs/UserCreateNestedOneWithoutPostsInput";

@TypeGraphQL.InputType("PostCreateInput", {
  isAbstract: true
})
export class PostCreateInput {
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

  @TypeGraphQL.Field(_type => UserCreateNestedOneWithoutPostsInput, {
    nullable: true
  })
  author?: UserCreateNestedOneWithoutPostsInput | undefined;

  @TypeGraphQL.Field(_type => CategoryCreateNestedManyWithoutPostsInput, {
    nullable: true
  })
  categories?: CategoryCreateNestedManyWithoutPostsInput | undefined;
}
