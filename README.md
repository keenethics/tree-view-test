# Tree View Test

## Goal
Develop a tool which visually presents data in a tree-view format. The goal of the exercise is to allow the client to validate our software development skill.

## Assumptions & Decisions
For the sake of timeliness, the following assumptions were made / decisions taken:
- User authentication / session management is not in scope for the test. Therefore, there will only be one single global persistent selectors selection (and no access management whatsoever). We used a jwt stored as browser cookies to identify a session - this is not suitable for a real production application.
- The solution is meant to be run in a local environment in development mode and not meant for production purposes
- The list of selectors is considered static and will be served directly from server memory vs. stored in the database
- Because the list of static and finite, the search capability was implemented in the front end. The search capability is not throttled and will hang on occasions if the user is typing too fast (this can be fixed easily).
- We use the local database both for running the local application and for testing. This is not suitable in a real world scenario (where we'd have an immutable docker-ized local QA environment for local testing purposes).
- We didn't spend meaningful time styling the tree view which results in a very bland design and a few ux issues (e.g., the tree view does not expand or close when clicking on the (+) and (-) next to the checkbox): [example here](https://image.ibb.co/n6sgY9/plusbox.gif)
- Client side unit testing only covers a tiny portion of the code
- Out of scope:
  - End to end testing is not in scope for the test. Andrew and Serhii will focus on static analysis, unit testing and integration testing
  - Database / Server resilience, scalability and tuning
  - Database <> Server integration testing (this would be required in production)

## Tech stack (front end & back end)
- front end:
React
- back end:
Node.js, Restify, MongoDB, Mongoose, Docker


## Folder Structure
- **src/**: Code related to the web client (React app) and a few unit tests
- **server/**: Restify API back-end code
- **test/**: Integration tests for back-end API
- **db/**: Installation scripts for mongodb (docker) + local mongodb database
- **public/**: Public files served by web server (e.g., favicon.ico)
- **.env**: File containing some of the local configuration settings

## Prerequisites

- Node >= v8
- Docker >= v18
- npm >= 5.6.0
- yarn > 1.7
- OS: Latest versions of Mac OSX or Linux

## Installation
> ### Install all required modules
> ```
> $ npm install
> ```
> ### Install and start the mongodb database (docker container)
> ```
> $ npm run start:db
> ```
> If the installation fails, please add the .env.remote file to the root of the project to connect to the remote database

## Run
Please follow the below steps in a sequential order:
Start the mongodb server (if you haven't already)
```
$ npm run start:db
```
Start the api node server:
```
$ npm run start:server
```
Start the web server serving the react web-page
```
$ npm run start
```

## Test
Run fron-end unit tests:
```
$ npm run test:unit
```
Run API integration tests (the database server needs to be running):
```
$ npm run test:integration
```
