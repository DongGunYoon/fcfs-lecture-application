import { Inject } from '@nestjs/common';
import { UserService, userServiceSymbol } from 'src/user/domain/interface/service/user.service';
import { SignUpUseCase } from 'src/user/domain/interface/use-case/user.use-case';
import { UserDomain } from 'src/user/domain/model/user.domain';

export class SignUpUseCaseImpl implements SignUpUseCase {
  constructor(@Inject(userServiceSymbol) private readonly userService: UserService) {}

  execute(name: string): Promise<UserDomain> {
    return this.userService.signUp(name);
  }
}
