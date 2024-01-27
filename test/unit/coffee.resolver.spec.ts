import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeResolver } from '../../src/coffee/coffee.resolver';
import { CoffeeService } from '../../src/coffee/coffee.service';
import { CreateCoffeeInput } from '../../src/coffee/dto/create-coffee.input';
import { UpdateCoffeeInput } from 'src/coffee/dto/update-coffee.input';

const baseCoffee: CreateCoffeeInput = {
  name: 'Cappucino',
  price: 4,
  size: 'big',
};

describe('CoffeeResolver', () => {
  let coffeeResolver: CoffeeResolver;
  let coffeeService: CoffeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeResolver,
        {
          provide: CoffeeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    coffeeResolver = module.get<CoffeeResolver>(CoffeeResolver);
    coffeeService = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(coffeeResolver).toBeDefined();
  });

  it('findAllCoffees', async () => {
    await coffeeResolver.findAllCoffees();
    expect(coffeeService.findAll).toHaveBeenCalled();
  });

  it('findOneCoffee', async () => {
    await coffeeResolver.findOneCoffee(1);
    expect(coffeeService.findOne).toHaveBeenCalledWith(1);
  });

  it('createCoffee', async () => {
    await coffeeResolver.createCoffee(baseCoffee);
    expect(coffeeService.create).toHaveBeenCalledWith(baseCoffee);
  });

  it('updateCoffee', async () => {
    const coffee: UpdateCoffeeInput = {
      id: 1,
      ...baseCoffee,
    };
    await coffeeResolver.updateCoffee(coffee);
    expect(coffeeService.update).toHaveBeenCalledWith(coffee);
  });

  it('removeCoffee', async () => {
    await coffeeResolver.removeCoffee(1);
    expect(coffeeService.remove).toHaveBeenCalledWith(1);
  });
});
