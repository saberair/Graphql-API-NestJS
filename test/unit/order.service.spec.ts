import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/order/order.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { prismaMocks } from '../mocks/prismaMocks';
import { Coffee, Order } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

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
            coffee: prismaMocks,
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
    const coffee: Coffee = {
      id: 1,
      name: 'Cappucino',
      price: 4,
      size: 'big',
      inventoryCount: 40,
    };

    const { id: _, ...createOrderInput } = baseOrder;

    const createdOrder: Order = baseOrder;

    (prismaService.coffee.findUnique as jest.Mock).mockResolvedValueOnce(
      coffee,
    );

    (prismaService.order.create as jest.Mock).mockResolvedValueOnce(
      createdOrder,
    );

    const order = await orderService.create(createOrderInput);

    expect(prismaService.coffee.findUnique).toHaveBeenCalledWith({
      where: { id: createOrderInput.coffeeId },
    });

    expect(prismaService.coffee.update).toHaveBeenCalledWith({
      where: { id: createOrderInput.coffeeId },
      data: { inventoryCount: { decrement: createOrderInput.quantity } },
    });

    expect(prismaService.order.create).toHaveBeenCalledWith({
      data: createOrderInput,
    });

    expect(order).toEqual(createdOrder);
  });

  it('throws an error when there is no sufficient coffee inventory', async () => {
    const coffee: Coffee = {
      id: 1,
      name: 'Cappucino',
      price: 4,
      size: 'big',
      inventoryCount: 2,
    };

    const { id: _, ...createOrderInput } = baseOrder;

    (prismaService.coffee.findUnique as jest.Mock).mockResolvedValueOnce(
      coffee,
    );

    await expect(orderService.create(createOrderInput)).rejects.toEqual(
      new BadRequestException('Insufficient inventory'),
    );
  });
});
