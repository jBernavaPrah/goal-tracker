##Welcome to Goal Tracker!

### Running on local machine:

You need at least `docker` your local machine.

1. Clone this project.
2. Open the directory where you cloned the project.  
3. Run `docker run --rm -v $(pwd)/src:/app composer install` to install all php dependencies.
4. Run: `docker compose up -d`, will start all services need to run this project.
5. The first time, it's required to migrate the database, so run `docker run --rm -v $(pwd)/src:/app php artisan migrate`.
6. After all services starts, go to the application on http://localhost:8000 


### Tips:

- Generate new BE schema during developing run: `php artisan lighthouse:print-schema --write --json`
- Generate "generated" graphql.tsx useful during FE developing run: `yarn generate` 
- Start FE watcher and reload browsers on jsx changes: `yarn watch`