import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../../prisma/types';

export const ROLE_KEY = 'role';

export const ROLE = (role: Role): CustomDecorator<string> =>
  SetMetadata(ROLE_KEY, role);
