import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/order/order.service';

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
    await orderService.findAll();
  });

  it('creates a new order', async () => {
    await orderService.create();
  });
});
