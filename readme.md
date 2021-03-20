# Disbursement Service

Flip.id Backend Engineer technical test

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
- `GET /user/{userId}` Get user data by ID
- `GET /user/{userId}/disbursement` Get user's disbursement history
- `POST /user/disbursement` Submit disbursement with `user_id` and `remark` params
