import { getApolloServer } from '@nestjs/apollo';
import gql from 'graphql-tag';
import { CreateCoffeeInput } from '../../src/coffee/dto/create-coffee.input';
import { UpdateCoffeeInput } from 'src/coffee/dto/update-coffee.input';
import { AppFixture, createAppFixture } from './e2e-setup';

describe('Coffee (e2e)', () => {
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

  it('creates a new coffee', async () => {
    const Create_Coffee_Mutation = gql`
      mutation createCoffee($createCoffeeInput: CreateCoffeeInput!) {
        createCoffee(createCoffeeInput: $createCoffeeInput) {
          id
          name
          price
          size
        }
      }
    `;

    const createCoffeeInput: CreateCoffeeInput = {
      name: 'Express',
      price: 3,
      size: 'Big',
    };

    const response = await apolloServer.executeOperation({
      query: Create_Coffee_Mutation,
      variables: { createCoffeeInput },
    });

    expect(response).toMatchSnapshot({
      body: {
        singleResult: {
          data: {
            createCoffee: {
              id: expect.any(Number),
            },
          },
        },
      },
    });
  });

  it('updates coffee', async () => {
    const Update_Coffee_Mutation = gql`
      mutation updateCoffee($updateCoffeeInput: UpdateCoffeeInput!) {
        updateCoffee(updateCoffeeInput: $updateCoffeeInput) {
          id
          name
          price
          size
        }
      }
    `;

    const updateCoffeeInput: UpdateCoffeeInput = {
      id: 1,
      name: 'Express',
      price: 4,
      size: 'Small',
    };

    const response = await apolloServer.executeOperation({
      query: Update_Coffee_Mutation,
      variables: { updateCoffeeInput },
    });

    expect(response).toMatchSnapshot();
  });

  it('removes a coffee', async () => {
    const Remove_Coffee_Mutation = gql`
      mutation removeCoffee($id: Int!) {
        removeCoffee(id: $id) {
          id
          name
          price
          size
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: Remove_Coffee_Mutation,
      variables: { id: 2 },
    });

    expect(response).toMatchSnapshot();
  });

  it('finds all coffees', async () => {
    const Find_All_Coffees_Query = gql`
      query FindAllCoffees {
        findAllCoffees {
          id
          name
          price
          size
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: Find_All_Coffees_Query,
    });

    expect(response).toMatchSnapshot();
  });

  it('finds one coffee', async () => {
    const Find_One_Coffee_Query = gql`
      query FindOneCoffee($id: Int!) {
        findOneCoffee(id: $id) {
          id
          name
          price
          size
        }
      }
    `;

    const response = await apolloServer.executeOperation({
      query: Find_One_Coffee_Query,
      variables: { id: 1 },
    });

    expect(response).toMatchSnapshot();
  });
});
