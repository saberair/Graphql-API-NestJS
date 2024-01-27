import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeResolver } from './coffee.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CoffeeResolver, CoffeeService],
})
export class CoffeeModule {}
