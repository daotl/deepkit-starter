# deepkit-starter

A [Deepkit Framework](https://deepkit.io/) starter template.

# Getting started

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

Visit http://localhost:8080/api/hello/nex

# GraphQL branch

[TypeGraphQL](https://typegraphql.com/) + [TypeGraphQL Prisma](https://prisma.typegraphql.com/) + [GraphQL Yoga](https://the-guild.dev/graphql/yoga-server)
