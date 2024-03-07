import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: Record<string, any>) {
    return this.authService.login({
      email: loginDto.email,
      password: loginDto.password,
      role: loginDto.role,
    });
  }
}
