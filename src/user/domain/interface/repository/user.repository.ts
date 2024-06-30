import { Nullable } from '../../../../common/type/native';
import { UserDomain } from '../../model/user.domain';

export const userRepositorySymbol = Symbol.for('UserRepository');

export interface UserRepository {
  findOneById(id: number): Promise<Nullable<UserDomain>>;
  create(user: UserDomain): Promise<UserDomain>;
}
