import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoffeeService {
  constructor(private prisma: PrismaService) {}
  /**
   *
   * @returns all coffees
   */
  async findAll() {
    return this.prisma.coffee.findMany();
  }

  /**
   *
   * @param id a coffee ID
   * @returns a found coffee
   */
  async findOne(id: number) {
    return this.prisma.coffee.findUnique({ where: { id } });
  }

  /**
   *
   * @param createCoffeeInput the new coffee input
   * @returns the created coffee
   */
  async create(createCoffeeInput: CreateCoffeeInput) {
    return this.prisma.coffee.create({
      data: createCoffeeInput,
    });
  }

  /**
   *
   * @param updateCoffeeInput the updated coffee fields
   * @returns the updated coffee
   */
  update(updateCoffeeInput: UpdateCoffeeInput) {
    const { id, ...rest } = updateCoffeeInput;
    return this.prisma.coffee.update({
      where: { id },
      data: rest,
    });
  }

  /**
   *
   * @param id the id of the coffee to remove
   * @returns the removed coffee
   */
  remove(id: number) {
    return this.prisma.coffee.delete({ where: { id } });
  }
}
