import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

export function getPgTestTypeOrmModule() {
  const rootDir = path.resolve(__dirname, '../../..');

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'root',
    password: 'password',
    database: 'fcfs-lecture-application-test',
    entities: [path.join(rootDir, 'src', '**', '*.entity.{ts,js}')],
    synchronize: true,
  });
}
