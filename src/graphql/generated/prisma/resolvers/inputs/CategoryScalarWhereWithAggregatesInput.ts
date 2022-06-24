import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeWithAggregatesFilter } from "../inputs/DateTimeWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("CategoryScalarWhereWithAggregatesInput", {
  isAbstract: true
})
export class CategoryScalarWhereWithAggregatesInput {
  @TypeGraphQL.Field(_type => [CategoryScalarWhereWithAggregatesInput], {
    nullable: true
  })
  AND?: CategoryScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryScalarWhereWithAggregatesInput], {
    nullable: true
  })
  OR?: CategoryScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => [CategoryScalarWhereWithAggregatesInput], {
    nullable: true
  })
  NOT?: CategoryScalarWhereWithAggregatesInput[] | undefined;

  @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
    nullable: true
  })
  id?: IntWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  createdAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeWithAggregatesFilter, {
    nullable: true
  })
  updatedAt?: DateTimeWithAggregatesFilter | undefined;

  @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
    nullable: true
  })
  name?: StringWithAggregatesFilter | undefined;
}
