import * as TypeGraphQL from "type-graphql";

export enum Role {
  user = "user",
  admin = "admin"
}
TypeGraphQL.registerEnumType(Role, {
  name: "Role",
  description: undefined,
});
