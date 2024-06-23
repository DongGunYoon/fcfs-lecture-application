import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'password',
      database: 'fcfs-lecture-application',
      entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
