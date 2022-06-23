#!/bin/sh
mkdir -p ~/dev/docker-volumes/deepkit-strater/postgres
docker run --name deepkit-strater-postgres -d \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=deepkit-strater \
  -p 5432:5432 \
  -v ~/dev/docker-volumes/deepkit-strater/postgres:/var/lib/postgresql/data \
  postgres:15beta1
