# stationf-technical-test-back-saber
## Usage

# Here's how to run the project (generate javascript files on a lib directory that can be used by other components):

####
# install the dependencies, run the following command:
npm install

# run docker compose file
docker-compose up -d

# run the entrypoint file
./entrypoint.sh
####


##### test the api using graphql playgroud: "http://localhost:5000/graphql"
## generate client access token ( you can change the role to be ADMIN or CUSTOMER)
curl -X POST http://localhost:5000/auth/login -d '{"email": "john@gmail.com", "password": "changeme", "role": "ADMIN"}' -H "Content-Type: application/json"



# Running Tests
# unit tests
npm run test:unit

# e2e tests
npm run test:e2e

#### choices ###
Prisma as ORM to be compatible with multiple databases
dataloader library : for a better performance when loading data
fastify for more secure api
