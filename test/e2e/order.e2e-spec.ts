import { getApolloServer } from '@nestjs/apollo';
import gql from 'graphql-tag';
import { CreateOrderInput } from '../../src/order/dto/create-order.input';
import { AppFixture, createAppFixture } from './e2e-setup';

describe('Order (e2e)', () => {
  let appFixture: AppFixture;
  let apolloServer: ReturnType<typeof getApolloServer>;

  afterAll(async () => {
    appFixture.destroy();
  });

  beforeAll(async () => {
    appFixture = await createAppFixture();
    apolloServer = appFixture.apolloServer;
  });

  beforeEach(async () => {
    await appFixture.reset();
  });

  it('creates a new order', async () => {
    const Create_Order_Mutation = gql`
      mutation createOrder($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
          id
          quantity
          status
          coffee {
            id
            name
          }
        }
      }
    `;

    const createOrderInput: CreateOrderInput = {
      coffeeId: 1,
      quantity: 5,
      status: 'Done',
    };

    const response = await apolloServer.executeOperation({
      query: Create_Order_Mutation,
      variables: { createOrderInput },
    });

    expect(response).toMatchSnapshot({
      body: {
        singleResult: {
          data: {
            createOrder: {
              id: expect.any(Number),
            },
          },
        },
      },
    });
  });

  it('finds all orders', async () => {
    const Find_All_Orders_Query = gql`
      query FindAllOrders {
        findAllOrders {
          id
          quantity
          status
          coffee {
            id
            name
          }
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: Find_All_Orders_Query,
    });

    expect(response).toMatchSnapshot();
  });
});
