import { Injectable } from '@nestjs/common';
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
    return this.prisma.order.create({
      data: createOrderInput,
    });
  }
}
