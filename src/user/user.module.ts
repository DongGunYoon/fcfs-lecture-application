import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/user.entity';
import { userServiceSymbol } from './domain/interface/user.service';
import { UserServiceImpl } from './application/service/user.service.impl';
import { userRepositorySymbol } from './domain/interface/user.repository';
import { UserRepositoryImpl } from './infrastructure/repository/user.repository.impl';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    { provide: userServiceSymbol, useClass: UserServiceImpl },
    { provide: userRepositorySymbol, useClass: UserRepositoryImpl },
  ],
  exports: [userServiceSymbol],
})
export class UserModule {}
