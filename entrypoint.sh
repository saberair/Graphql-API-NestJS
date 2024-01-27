#!/bin/sh

#  Migrate schema
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start the NestJS application
exec npm run start:dev
