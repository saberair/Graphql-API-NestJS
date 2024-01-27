import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/order/order.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { prismaMocks } from '../mocks/prismaMocks';
import { Order } from '@prisma/client';

const baseOrder: Order = {
  id: 1,
  quantity: 3,
  status: 'InProgress',
  coffeeId: 1,
};

describe('OrderService', () => {
  let orderService: OrderService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useValue: {
            order: prismaMocks,
          },
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('finds all orders', async () => {
    const ordersList: Order[] = [baseOrder, { ...baseOrder, id: 2 }];
    (prismaService.order.findMany as jest.Mock).mockResolvedValueOnce(
      ordersList,
    );

    const orders = await orderService.findAll();

    expect(prismaService.order.findMany).toHaveBeenCalled();
    expect(orders).toEqual(ordersList);
  });

  it('creates a new order', async () => {
    const { id: _, ...createOrderInput } = baseOrder;

    const createdOrder: Order = baseOrder;

    (prismaService.order.create as jest.Mock).mockResolvedValueOnce(
      createdOrder,
    );

    const order = await orderService.create(createOrderInput);

    expect(prismaService.order.create).toHaveBeenCalledWith({
      data: createOrderInput,
    });

    expect(order).toEqual(createdOrder);
  });
});
