# Mastermind - PugStunt

## Requirements
* Node
* NPM
* Bower - Install: `npm install bower -g`
* Gulp - Install: `npm install gulp -g`

## Gulp tasks
* `gulp serve` - Will build and create a local server. This instance will call the localhost API.
* `gulp dist` - Will build the UI using minified javascript. The build will be in the `dist` folder.
* `gulp test` - Will run all unit tests.
* `gulp tdd` - Will run all unit tests, watch file changes and run again.

## Development

You can use Docker to run the backend and proxy it.
```sh
docker run -d --name=redis redis:alpine
docker run -d -p 8080:8080 --link redis:db -e redis.connection.string=redis://db:6379 pugstunt/mastermind-api:latest
```
