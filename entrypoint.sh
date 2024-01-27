#!/bin/sh

#  Generate a sql migration
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start the NestJS application
exec npm run start:dev
