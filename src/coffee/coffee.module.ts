import { Module } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeResolver } from './coffee.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CoffeeDataLoader } from './coffee.dataloader';

@Module({
  imports: [PrismaModule],
  providers: [CoffeeResolver, CoffeeService, CoffeeDataLoader],
  exports: [CoffeeDataLoader],
})
export class CoffeeModule {}
