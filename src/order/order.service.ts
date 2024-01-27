import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  /**
   *
   * @returns the list of orders
   */
  async findAll() {
    return this.prisma.order.findMany();
  }

  /**
   *
   * @param createOrderInput the new order input
   * @returns the created order
   */
  async create(createOrderInput: CreateOrderInput) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id: createOrderInput.coffeeId },
    });

    if (!coffee || coffee.inventoryCount < createOrderInput.quantity) {
      throw new BadRequestException('Insufficient inventory');
    }

    await this.prisma.coffee.update({
      where: { id: createOrderInput.coffeeId },
      data: { inventoryCount: { decrement: createOrderInput.quantity } },
    });

    return this.prisma.order.create({
      data: createOrderInput,
    });
  }
}
