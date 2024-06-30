import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository, userRepositorySymbol } from 'src/user/domain/interface/repository/user.repository';
import { UserService } from 'src/user/domain/interface/service/user.service';
import { UserDomain } from 'src/user/domain/model/user.domain';

@Injectable()
export class UserServiceImpl implements UserService {
  constructor(@Inject(userRepositorySymbol) private readonly userRepository: UserRepository) {}

  async getOrThrow(id: number): Promise<UserDomain> {
    const user = await this.userRepository.findOneById(id);

    if (user === null) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return user;
  }

  async signUp(name: string): Promise<UserDomain> {
    const user = UserDomain.create(name);

    return await this.userRepository.create(user);
  }
}
