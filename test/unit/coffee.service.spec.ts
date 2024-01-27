import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from '../../src/coffee/coffee.service';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeService],
    }).compile();

    coffeeService = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(coffeeService).toBeDefined();
  });

  it('finds all coffees', async () => {
    const coffeeList: Coffee[] = [baseCoffee, { ...baseCoffee, id: 2 }];

    const coffees = await coffeeService.findAll();

    expect(coffees).toEqual(coffeeList);
  });

  it('finds one coffee', async () => {
    const coffee = await coffeeService.findOne(baseCoffee.id);

    expect(coffee).toEqual(baseCoffee);
  });

  it('creates a new coffee', async () => {
    const { id: _, ...createCoffeeInput } = baseCoffee;

    const coffee = await coffeeService.create(createCoffeeInput);

    expect(coffee).toEqual(baseCoffee);
  });

  it('updates a coffee name', async () => {
    const updatedCoffeeName: UpdateCoffeeInput = {
      id: baseCoffee.id,
      name: 'Express',
    };

    const updatedCoffee: Coffee = {
      ...baseCoffee,
      name: 'Express',
    };

    const coffee = await coffeeService.update(updatedCoffeeName);

    expect(coffee).toEqual(updatedCoffee);
  });

  it('removes a coffee', async () => {
    const id = baseCoffee.id;

    const coffee = await coffeeService.remove(id);

    expect(coffee).toEqual(baseCoffee);
  });
});
