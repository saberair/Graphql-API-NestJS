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




# Running Tests
# unit tests
npm run test:unit

# e2e tests
npm run test:e2e

#### choices ###
Prisma as ORM to be compatible with multiple databases
dataloader library : for a better performance when loading data
fastify for more secure api

I would use other libraries like class-validator ro validate the client input / swagger for api documentation : but I have not enough time ...