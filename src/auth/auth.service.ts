import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../prisma/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: { email: string; password: string; role: Role }) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
