##Welcome to Goal Tracker!

### Running on local machine:

You need at least `docker` your local machine.

1. Clone this project.
2. Run `docker run --rm -v $(pwd)/src:/app composer install`
3. Run: `docker compose up -d`, will start all services need to run this project.
4. After all services starts, go to the application on http://localhost:8000 