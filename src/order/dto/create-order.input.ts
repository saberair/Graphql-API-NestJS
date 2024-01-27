import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  coffeeId: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  status: string;
}
