import { UserDomain } from '../model/user.domain';

export const userServiceSymbol = Symbol.for('UserService');

export interface UserService {
  getOrThrow(id: number): Promise<UserDomain>;
}
