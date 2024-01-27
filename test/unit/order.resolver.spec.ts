import { Test, TestingModule } from '@nestjs/testing';
import { OrderResolver } from '../../src/order/order.resolver';
import { OrderService } from '../../src/order/order.service';
import { CoffeeService } from '../../src/coffee/coffee.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateOrderInput } from '../../src/order/dto/create-order.input';

const baseOrder: CreateOrderInput = {
  coffeeId: 1,
  status: 'InProgress',
  quantity: 4,
};

describe('OrderResolver', () => {
  let orderResolver: OrderResolver;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderResolver,
        CoffeeService,
        PrismaService,
        {
          provide: OrderService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    orderResolver = module.get<OrderResolver>(OrderResolver);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderResolver).toBeDefined();
  });

  it('findAllOrders', async () => {
    await orderResolver.findAllOrders();
    expect(orderService.findAll).toHaveBeenCalled();
  });

  it('createOrder', async () => {
    await orderResolver.createOrder(baseOrder);
    expect(orderService.create).toHaveBeenCalledWith(baseOrder);
  });
});
