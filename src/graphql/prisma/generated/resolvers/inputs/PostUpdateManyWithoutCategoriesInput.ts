import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { PostCreateOrConnectWithoutCategoriesInput } from "../inputs/PostCreateOrConnectWithoutCategoriesInput";
import { PostCreateWithoutCategoriesInput } from "../inputs/PostCreateWithoutCategoriesInput";
import { PostScalarWhereInput } from "../inputs/PostScalarWhereInput";
import { PostUpdateManyWithWhereWithoutCategoriesInput } from "../inputs/PostUpdateManyWithWhereWithoutCategoriesInput";
import { PostUpdateWithWhereUniqueWithoutCategoriesInput } from "../inputs/PostUpdateWithWhereUniqueWithoutCategoriesInput";
import { PostUpsertWithWhereUniqueWithoutCategoriesInput } from "../inputs/PostUpsertWithWhereUniqueWithoutCategoriesInput";
import { PostWhereUniqueInput } from "../inputs/PostWhereUniqueInput";

@TypeGraphQL.InputType("PostUpdateManyWithoutCategoriesInput", {
  isAbstract: true
})
export class PostUpdateManyWithoutCategoriesInput {
  @TypeGraphQL.Field(_type => [PostCreateWithoutCategoriesInput], {
    nullable: true
  })
  create?: PostCreateWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostCreateOrConnectWithoutCategoriesInput], {
    nullable: true
  })
  connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostUpsertWithWhereUniqueWithoutCategoriesInput], {
    nullable: true
  })
  upsert?: PostUpsertWithWhereUniqueWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostWhereUniqueInput], {
    nullable: true
  })
  set?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostWhereUniqueInput], {
    nullable: true
  })
  disconnect?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostWhereUniqueInput], {
    nullable: true
  })
  delete?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostWhereUniqueInput], {
    nullable: true
  })
  connect?: PostWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostUpdateWithWhereUniqueWithoutCategoriesInput], {
    nullable: true
  })
  update?: PostUpdateWithWhereUniqueWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostUpdateManyWithWhereWithoutCategoriesInput], {
    nullable: true
  })
  updateMany?: PostUpdateManyWithWhereWithoutCategoriesInput[] | undefined;

  @TypeGraphQL.Field(_type => [PostScalarWhereInput], {
    nullable: true
  })
  deleteMany?: PostScalarWhereInput[] | undefined;
}
