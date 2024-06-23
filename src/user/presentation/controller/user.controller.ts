import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpUserRequest } from 'src/user/application/dto/request/sign-up-user.request';
import { UserResponse } from 'src/user/application/dto/response/user.response';
import { UserService, userServiceSymbol } from 'src/user/domain/interface/user.service';

@Controller('/users')
export class UserController {
  constructor(@Inject(userServiceSymbol) private readonly userService: UserService) {}

  @Post()
  async signUp(@Body() request: SignUpUserRequest): Promise<UserResponse> {
    return this.userService.signUp(request.name);
  }
}
