import { UserDomain } from 'src/user/domain/model/user.domain';

export class UserResponse {
  id: number;
  name: string;
  createdAt: Date;

  static from(user: UserDomain): UserResponse {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
