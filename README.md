# bike-service-hub
Express.js REST API. Fully configured code style with Prettier, ESlint and editorconfig. Entire CI/CD pipeline with pre-commit and pre-push hooks + github action to create a Docker image and deploy it in a server

## Project Information
This is a bike aggregator that lets you manage bike, bike rentals and all the process of renting a bike.  
The main focus was to practive TDD and CI/CD best practices, as well as utilizing all the utilities that ES6 provides.
Javascript's classes where optional, so I opted to go the ES5 way.

## ES6 snippets

## Configuration
Configure the project with a .env
```
TEST=
```

Then install the dependencies and start the project:
```sh
$ npm i
$ npm run dev
```

To push to the main branch, you need to pass the tests locally.
Then once you pushed to main, the CI pipeline will execute and push an updated image to DockerHub with the :latest and :x tag where x is the unique number of the execution.
