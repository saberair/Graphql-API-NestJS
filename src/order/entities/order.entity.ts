import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Coffee } from '../../coffee/entities/coffee.entity';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  status: string;

  @Field(() => Coffee)
  coffee: Coffee;
}
