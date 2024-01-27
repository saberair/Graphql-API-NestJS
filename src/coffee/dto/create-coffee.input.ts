import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  size: string;

  @Field(() => Int)
  inventoryCount: number;
}
