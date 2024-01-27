import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/order/order.service';
import { Order } from '@prisma/client';

const baseOrder: Order = {
  id: 1,
  quantity: 3,
  status: 'InProgress',
  coffeeId: 1,
};

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  it('finds all orders', async () => {
    const ordersList: Order[] = [baseOrder, { ...baseOrder, id: 2 }];

    const orders = await orderService.findAll();

    expect(orders).toEqual(ordersList);
  });

  it('creates a new order', async () => {
    const { id: _, ...createOrderInput } = baseOrder;

    const createdOrder: Order = baseOrder;

    const order = await orderService.create(createOrderInput);

    expect(order).toEqual(createdOrder);
  });
});
