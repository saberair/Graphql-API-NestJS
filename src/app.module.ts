import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CoffeeModule } from './coffee/coffee.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema/schema.gql',
      introspection: true,
      playground: true,
    }),
    CoffeeModule,
    OrderModule,
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule {}
