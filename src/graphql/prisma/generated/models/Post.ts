import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { PostCount } from "../resolvers/outputs/PostCount";

@TypeGraphQL.ObjectType("Post", {
  isAbstract: true
})
export class Post {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  id!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  title!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  content!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  published!: boolean;

  author?: User | null;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  authorId?: number | null;

  categories?: Category[];

  @TypeGraphQL.Field(_type => PostCount, {
    nullable: true
  })
  _count?: PostCount | null;
}
