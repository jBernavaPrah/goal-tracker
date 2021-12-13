#!/bin/sh
echo Building Environment

docker compose run --rm app composer install
docker run --rm -v $(pwd)/src:/app -w /app node:16-alpine yarn install
docker run --rm -v $(pwd)/src:/app -w /app node:16-alpine yarn prod

docker compose run --rm app php artisan migrate --force
docker compose run --rm app /bin/sh -c " cp .env.example .env && php artisan key:generate"

docker compose up -d