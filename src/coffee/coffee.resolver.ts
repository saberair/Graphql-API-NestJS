import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Resolver(() => Coffee)
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Mutation(() => Coffee)
  createCoffee(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Query(() => [Coffee], { name: 'coffee' })
  findAll() {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee)
  updateCoffee(@Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput) {
    return this.coffeeService.update(updateCoffeeInput.id, updateCoffeeInput);
  }

  @Mutation(() => Coffee)
  removeCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.remove(id);
  }
}
