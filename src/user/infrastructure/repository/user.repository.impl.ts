import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/user/domain/interface/repository/user.repository';
import { UserDomain } from 'src/user/domain/model/user.domain';
import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/user/domain/mapper/user.mapper';
import { Nullable } from 'src/common/type/native';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
  async findOneById(id: number): Promise<Nullable<UserDomain>> {
    const userEntity = await this.userRepository.findOneBy({ id });

    return userEntity && UserMapper.toDomain(userEntity);
  }

  async create(user: UserDomain): Promise<UserDomain> {
    const userEntity = await this.userRepository.save(UserMapper.toEntity(user));

    return UserMapper.toDomain(userEntity);
  }
}
