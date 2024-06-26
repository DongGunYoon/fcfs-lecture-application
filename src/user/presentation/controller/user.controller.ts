import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpUserRequest } from 'src/user/application/dto/request/sign-up-user.request';
import { UserResponse } from 'src/user/application/dto/response/user.response';
import { SignUpUseCase, signUpUseCaseSymbol } from 'src/user/domain/interface/use-case/user.use-case';

@Controller('/users')
export class UserController {
  constructor(@Inject(signUpUseCaseSymbol) private readonly signUpUseCase: SignUpUseCase) {}

  @Post()
  async signUp(@Body() request: SignUpUserRequest): Promise<UserResponse> {
    return this.signUpUseCase.execute(request.name);
  }
}
