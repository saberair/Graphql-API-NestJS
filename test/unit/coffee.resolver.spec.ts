import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeResolver } from '../../src/coffee/coffee.resolver';
import { CoffeeService } from '../../src/coffee/coffee.service';

describe('CoffeeResolver', () => {
  let resolver: CoffeeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeResolver, CoffeeService],
    }).compile();

    resolver = module.get<CoffeeResolver>(CoffeeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
