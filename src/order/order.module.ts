import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { CoffeeModule } from '../coffee/coffee.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [CoffeeModule, PrismaModule],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
