import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeService } from '../../src/coffee/coffee.service';

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
    await coffeeService.findAll();
  });

  it('finds one coffee', async () => {
    await coffeeService.findOne();
  });

  it('creates a new coffee', async () => {
    await coffeeService.create();
  });

  it('updates a coffee', async () => {
    await coffeeService.update();
  });

  it('removes a coffee', async () => {
    await coffeeService.remove();
  });
});
