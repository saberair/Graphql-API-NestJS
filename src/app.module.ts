import { Module } from '@nestjs/common';
import { CoffeeModule } from './coffee/coffee.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CoffeeModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
