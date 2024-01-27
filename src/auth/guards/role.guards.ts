import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role, User } from '../../prisma/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (role == null) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const request = gqlContext.req;
    const user: User = request.user;
    return role === user.role;
  }
}
