# deepkit-starter

A [Deepkit Framework](https://deepkit.io/) starter template.

Stack:
- [Deepkit Framework](https://deepkit.io/): Web framework and DI
- [tRPC](tRPC): Type-safe APIs
- [EdgeDB](https://www.edgedb.com/): A graph-relational database based on PostgreSQL

# Getting started

```sh
pnpm install
pnpm dev
```

Visit: http://localhost:8080/api/hello/nex
tRPC palyground: http://localhost:8080/api/trpc-playground

# Prisma + tRPC

`prisma-trpc` branch is starter for:

[Prisma](https://prisma.io/) + [tRPC](https://trpc.io/)

Start Postgres container for development:
```sh
cd docker-compose-dev
./init.sh
docker compose up -d
```

Initialized the database and start the app:
```sh
pnpm install
pnpm prisma:gen
pnpm prisma:reset
pnpm dev
```

# Prisma + GraphQL

`prisma-graphql` branch is starter for:

[Prisma](https://prisma.io/) + [TypeGraphQL](https://typegraphql.com/) + [TypeGraphQL Prisma](https://prisma.typegraphql.com/) + [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
