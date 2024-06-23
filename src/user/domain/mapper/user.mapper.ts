import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { UserDomain } from '../model/user.domain';

export class UserMapper {
  static toDomain(entity: UserEntity): UserDomain {
    return new UserDomain(entity.id, entity.name, entity.createdAt);
  }

  static toEntity(domain: UserDomain): UserEntity {
    return {
      id: domain.id,
      name: domain.name,
      createdAt: null,
    };
  }
}
