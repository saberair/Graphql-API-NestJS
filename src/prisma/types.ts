export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export type User = {
  email: string;
  password: string;
  role: Role;
};
