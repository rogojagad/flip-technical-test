# Disbursement Service

Flip.id Backend Engineer technical test

# Stack

- Language: Javascript (Node.js)
- Database: Firebase (Cloud Firestore)
- HTTP Framework: Express.js
- Compiler / Transpiler: Babel

# Setup

For both environment, make sure `.env` exists (pushed for submission purpose only)

For development environment:

- Run `npm run setup:dev` to install needed dependencies and register module alias
- Run `npm run db:seed-dev` to truncated current DB stated then seed the database with testing data
- Run `npm run start:dev` to run the HTTP server using Nodemon

For production environment:

- Run `npm run db:seed` to truncated current DB stated then seed the database with testing data
- Run `npm run start` to run the HTTP server using Babel's build result

# Feature Command List

- `disbursement:retry-drafted` to retry sending failed to send disbursement request to 3rd Party API
- `disbursement:update-status {transaction_id}` to update disbursement status from 3rd Party API by its transaction id

For dev environment, use prefix `disbursement-dev`

# Endpoint List

- `GET /users` Get list of all user
- `GET /user/{userId}` Get user data by ID (Auth Protected)
- `GET /user/{userId}/disbursement` Get user's disbursement history (Auth Protected)
- `POST /user/disbursement` Submit disbursement request with `remark` params (optional). (Auth Protected)
- `POST /login` Do login with `username` and `password` params. Use user's ID as username and password, available user's ID can be seen on `/users` endpoint
- `GET /disbursements` Read all disbursements 3rd Party Response

# Directory Structure

Main source code can be found under `src` directory. With each folder contains classes as follows:

- `Command` classes that can be run from CLI
- `Const` clasess that define data attribute (either value object or database record)
- `Controller` classes which responsible to handle HTTP request
- `Entity` classes that wrapped core functionality eg. HTTP Client and Firebase client
- `Middleware` functions that serves pre-validator / processing for incoming HTTP request
- `Repository` classes which responsible for querying data from data source (3rd Party API or Firebase)
- `Seed` classes which responsible to provide testing data
- `Service` classes which responsible to handle business logic
- `index.js` entrypoint for starting the app
