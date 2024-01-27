import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { Coffee } from '../../src/coffee/entities/coffee.entity';
import { Order as OrderModel, Coffee as CoffeeModel } from '@prisma/client';
import { CoffeeDataLoader } from '../coffee/coffee.dataloader';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private coffeeDataLoader: CoffeeDataLoader,
  ) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'order' })
  findAllOrders() {
    return this.orderService.findAll();
  }

  @ResolveField(() => Coffee)
  async coffee(@Parent() order: OrderModel): Promise<CoffeeModel> {
    return this.coffeeDataLoader.loader.load(order.coffeeId);
  }
}
