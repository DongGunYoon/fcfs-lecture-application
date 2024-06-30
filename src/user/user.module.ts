import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/user.entity';
import { userServiceSymbol } from './domain/interface/service/user.service';
import { UserServiceImpl } from './domain/service/user.service.impl';
import { userRepositorySymbol } from './domain/interface/repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserController } from './presentation/controller/user.controller';
import { signUpUseCaseSymbol } from './domain/interface/use-case/sign-up.use-case';
import { SignUpUseCaseImpl } from './application/use-case/sign-up.use-case.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: signUpUseCaseSymbol, useClass: SignUpUseCaseImpl },
    { provide: userServiceSymbol, useClass: UserServiceImpl },
    { provide: userRepositorySymbol, useClass: UserRepositoryImpl },
  ],
  exports: [userServiceSymbol],
})
export class UserModule {}
