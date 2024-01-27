import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Role } from '../prisma/types';
import { ROLE } from '../auth/decorators/role.decorator';

@Resolver(() => Coffee)
@ROLE(Role.ADMIN)
export class CoffeeResolver {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Mutation(() => Coffee)
  createCoffee(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeeService.create(createCoffeeInput);
  }

  @Query(() => [Coffee], { name: 'coffee' })
  findAllCoffees() {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  findOneCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee)
  updateCoffee(
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ) {
    return this.coffeeService.update(updateCoffeeInput);
  }

  @Mutation(() => Coffee)
  removeCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.remove(id);
  }
}
