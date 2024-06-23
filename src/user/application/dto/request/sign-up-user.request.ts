import { IsString } from 'class-validator';

export class SignUpUserRequest {
  @IsString()
  name: string;
}
