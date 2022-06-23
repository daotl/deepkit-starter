mkdir C:\1\docker-volumes\deepkit-starter\postgres
docker run --name deepkit-starter-postgres -d ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=password ^
  -e POSTGRES_DB=deepkit-starter ^
  -p 5432:5432 ^
  -v C:\1\docker-volumes\deepkit-starter\postgres:/var/lib/postgresql/data ^
  postgres:15beta1
