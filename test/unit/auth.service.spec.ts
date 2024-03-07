import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../src/auth/auth.service';
import { Role } from '../../src/prisma/types';

const mockedToken = 'TOKEN';
describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(mockedToken),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('login', async () => {
    const { access_token } = await authService.login({
      email: 'test@gmail.com',
      password: 'changeme',
      role: Role.ADMIN,
    });

    expect(access_token).toEqual(mockedToken);
  });
});
