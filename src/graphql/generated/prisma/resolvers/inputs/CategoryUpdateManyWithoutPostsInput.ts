import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { CategoryCreateOrConnectWithoutPostsInput } from "../inputs/CategoryCreateOrConnectWithoutPostsInput";
import { CategoryCreateWithoutPostsInput } from "../inputs/CategoryCreateWithoutPostsInput";
import { CategoryScalarWhereInput } from "../inputs/CategoryScalarWhereInput";
import { CategoryUpdateManyWithWhereWithoutPostsInput } from "../inputs/CategoryUpdateManyWithWhereWithoutPostsInput";
import { CategoryUpdateWithWhereUniqueWithoutPostsInput } from "../inputs/CategoryUpdateWithWhereUniqueWithoutPostsInput";
import { CategoryUpsertWithWhereUniqueWithoutPostsInput } from "../inputs/CategoryUpsertWithWhereUniqueWithoutPostsInput";
import { CategoryWhereUniqueInput } from "../inputs/CategoryWhereUniqueInput";

@TypeGraphQL.InputType("CategoryUpdateManyWithoutPostsInput", {
  isAbstract: true
})
export class CategoryUpdateManyWithoutPostsInput {
  @TypeGraphQL.Field(_type => [CategoryCreateWithoutPostsInput], {
    nullable: true
  })
  create?: CategoryCreateWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryCreateOrConnectWithoutPostsInput], {
    nullable: true
  })
  connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryUpsertWithWhereUniqueWithoutPostsInput], {
    nullable: true
  })
  upsert?: CategoryUpsertWithWhereUniqueWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryWhereUniqueInput], {
    nullable: true
  })
  set?: CategoryWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryWhereUniqueInput], {
    nullable: true
  })
  disconnect?: CategoryWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryWhereUniqueInput], {
    nullable: true
  })
  delete?: CategoryWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryWhereUniqueInput], {
    nullable: true
  })
  connect?: CategoryWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryUpdateWithWhereUniqueWithoutPostsInput], {
    nullable: true
  })
  update?: CategoryUpdateWithWhereUniqueWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryUpdateManyWithWhereWithoutPostsInput], {
    nullable: true
  })
  updateMany?: CategoryUpdateManyWithWhereWithoutPostsInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryScalarWhereInput], {
    nullable: true
  })
  deleteMany?: CategoryScalarWhereInput[] | undefined;
}
