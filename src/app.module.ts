import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm.module';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';

@Module({
  imports: [DatabaseModule, UserModule, LectureModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
