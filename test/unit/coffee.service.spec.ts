import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from '../../src/coffee/coffee.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { prismaMocks } from '../mocks/prismaMocks';
import { Coffee } from '@prisma/client';
import { UpdateCoffeeInput } from '../../src/coffee/dto/update-coffee.input';

const baseCoffee: Coffee = {
  id: 1,
  name: 'Cappucino',
  price: 4,
  size: 'big',
};

describe('CoffeeService', () => {
  let coffeeService: CoffeeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {
          provide: PrismaService,
          useValue: {
            coffee: prismaMocks,
          },
        },
      ],
    }).compile();

    coffeeService = module.get<CoffeeService>(CoffeeService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('finds all coffees', async () => {
    const coffeesList: Coffee[] = [baseCoffee, { ...baseCoffee, id: 2 }];
    (prismaService.coffee.findMany as jest.Mock).mockResolvedValueOnce(
      coffeesList,
    );

    const coffees = await coffeeService.findAll();

    expect(prismaService.coffee.findMany).toHaveBeenCalled();
    expect(coffees).toEqual(coffeesList);
  });

  it('finds one coffee', async () => {
    const foundCoffee: Coffee = baseCoffee;
    (prismaService.coffee.findUnique as jest.Mock).mockResolvedValueOnce(
      foundCoffee,
    );

    const coffee = await coffeeService.findOne(baseCoffee.id);

    expect(prismaService.coffee.findUnique).toHaveBeenCalledWith({
      where: { id: baseCoffee.id },
    });
    expect(coffee).toEqual(foundCoffee);
  });

  it('creates a new coffee', async () => {
    const { id: _, ...createCoffeeInput } = baseCoffee;

    const createdCoffee: Coffee = baseCoffee;

    (prismaService.coffee.create as jest.Mock).mockResolvedValueOnce(
      createdCoffee,
    );

    const coffee = await coffeeService.create(createCoffeeInput);

    expect(prismaService.coffee.create).toHaveBeenCalledWith({
      data: createCoffeeInput,
    });

    expect(coffee).toEqual(createdCoffee);
  });

  it('updates a coffee', async () => {
    const updatedCoffeeName: UpdateCoffeeInput = {
      id: baseCoffee.id,
      name: 'Express',
    };

    const updatedCoffee: Coffee = {
      ...baseCoffee,
      name: 'Express',
    };

    (prismaService.coffee.update as jest.Mock).mockResolvedValueOnce(
      updatedCoffee,
    );

    const coffee = await coffeeService.update(updatedCoffeeName);

    expect(prismaService.coffee.update).toHaveBeenCalledWith({
      where: { id: updatedCoffeeName.id },
      data: { name: updatedCoffeeName.name },
    });

    expect(coffee).toEqual(updatedCoffee);
  });

  it('removes a coffee', async () => {
    const id = baseCoffee.id;

    const deletedCoffee: Coffee = baseCoffee;

    (prismaService.coffee.delete as jest.Mock).mockResolvedValueOnce(
      deletedCoffee,
    );

    const coffee = await coffeeService.remove(id);

    expect(prismaService.coffee.delete).toHaveBeenCalledWith({ where: { id } });
    expect(coffee).toEqual(deletedCoffee);
  });
});
