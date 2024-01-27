import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  size: string;
}
