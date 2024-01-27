/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { PrismaService } from '../../src/prisma/prisma.service';
import { getApolloServer } from '@nestjs/apollo';
import { AuthenticationGuard } from '../../src/auth/guards/auth.guard';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleGuard } from '../../src/auth/guards/role.guards';

export type AppFixture = {
  apolloServer: ReturnType<typeof getApolloServer>;
  prismaService: PrismaService;
  destroy: () => Promise<void>;
  reset: () => Promise<void>;
};

export const GQL_REQUEST_MOCK = { headers: { authorization: 'Bearer TEST' } };

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // we always allow access (bypassing authentication)
    return true;
  }
}

@Injectable()
export class MockRoleGuard implements CanActivate {
  canActivate(
    _context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // we always allow access (bypassing role check)
    return true;
  }
}

export async function createAppFixture(): Promise<AppFixture> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(AuthenticationGuard)
    .useClass(MockAuthGuard)
    .overrideProvider(RoleGuard)
    .useClass(MockRoleGuard)
    .compile();

  const app = moduleFixture.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter(),
  );

  await app.init();

  const prismaService = moduleFixture.get(PrismaService);

  const apolloServer = getApolloServer(app);

  const destroy = () => app.close();
  const reset = () => seedDataBase(prismaService);

  return { apolloServer, prismaService, destroy, reset };
}

async function seedDataBase(prismaService: PrismaService) {
  await prismaService.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`;
  await prismaService.$executeRaw`TRUNCATE TABLE "Coffee" RESTART IDENTITY CASCADE;`;

  await prismaService.coffee.createMany({
    data: [
      { name: 'Cappucino', price: 4, size: 'Big', inventoryCount: 40 },
      { name: 'Expresso', price: 3, size: 'Small', inventoryCount: 30 },
    ],
  });

  const coffees = await prismaService.coffee.findMany({});

  await prismaService.order.createMany({
    data: [
      { coffeeId: coffees[0].id, quantity: 2, status: 'InProgress' },
      { coffeeId: coffees[0].id, quantity: 1, status: 'Done' },
    ],
  });
}
