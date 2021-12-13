## Welcome to Goal Tracker!

This is a simple table-football Goal Tracker.

- It's not production-ready.

### How to run this project:

You need at least `docker` and `git` your local machine.

1. Clone this project and open the directory where you cloned the project. `git clone https://github.com/jBernavaPrah/goal-tracker.git && cd goal-tracker`
2. Run `sh build.sh` to install all php and react dependencies. This will take some time.
3. After docker services start, open your browser and go to http://localhost:8080

### Would you improve it?

Clone this project, improve it and send me a PR! I will review it, and if is good enough, will be merged. 

### Tips during development:

- Generate new BE GraphQL schema, to be used with "JS Graphql" plugin for PHPStorm, run: `php artisan lighthouse:print-schema --write --json`
- Generate "generated" graphql.tsx for FE run: `yarn generate` (or the equivalent using the docker image.)
- Start FE watcher and reload browsers on jsx files changes: `yarn watch` (or the equivalent using the docker image.)