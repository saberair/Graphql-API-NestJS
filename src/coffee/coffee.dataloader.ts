import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Coffee } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoffeeDataLoader {
  public readonly loader: DataLoader<number, Coffee>;

  constructor(private prisma: PrismaService) {
    this.loader = new DataLoader<number, Coffee>(
      async (coffeeIds: number[]) => {
        const coffees = await this.prisma.coffee.findMany({
          where: { id: { in: coffeeIds } },
        });
        const coffeeMap = new Map(coffees.map((coffee) => [coffee.id, coffee]));
        return coffeeIds.map(
          (coffeeId) =>
            coffeeMap.get(coffeeId) ||
            new Error(`Coffee with ID ${coffeeId} not found`),
        );
      },
    );
  }
}
