import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Coffee {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field()
  size: string;

  @Field(() => Int)
  inventoryCount: number;
}
