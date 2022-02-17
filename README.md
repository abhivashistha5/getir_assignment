# Getir Assigment
![Getir logo](https://getir.uk/_next/image/?url=https%3A%2F%2Flanding-strapi-images-development.s3.eu-west-1.amazonaws.com%2Fgetir_groceries_34ddbc9659.svg&w=3840&q=75)


<b>Getir Backend Challange.</b>

This project is developed and tested on `node.js 16.14.0`.

It uses airbnb code style for linitng and `jest` for test runner.

# Build
- Run `npm run clean`
- Run `npm run build`

# Deployment
- Create a .env file from .env.example and add environment-specific variables in `NAME=VALUE` format.
- Run `npm install`

For Production
- Build the project using `npm run build`
- Start server using `npm run start`


For local development
- Run `npm run dev` for running nodemon
- Run `npm run lint` to perform lint analysis

# Test
- Run `npm run test` for running tests
- Run `npm run test:cov` for coverage report
- Run `npm run test:watch` for running test in watch mode while developing


# Directory structure

## `src`

It contains all the source code for the project

### `src/route/`

It contains all the api endpoints in seperate modules.<br>

#### `src/route/<moduleName>/<moduleName>.controller.js`

It is the API controller file. It defines the  router middlewares and validations.

#### `src/route/<moduleName>/<moduleName>.validation.js`

It contains the validations for the apis.

#### `src/route/<moduleName>/<moduleName>.service.js`

It contains the module business logic.

#### `src/route/<moduleName>/<modelName>.repository.js`

It contains logic for the data interactions.

#### `src/route/<moduleName>/<modelName>.model.js`

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

### `src/common/`

It contains the common messages and constants.

#### `src/common/error.js`

All the custom error classes are defined here.

#### `src/common/responseMessage.js`

All the response messages are defined here.

#### `src/common/statusCode.js`

All the response status codes are defined here.

### `src/lib/`

It contains the common libraries such as logger and utility.

### `src/middleware/`

All the middlewares that can be used are defined here.

## `test`

It contains the test cases in the similar directory structure as `src`

