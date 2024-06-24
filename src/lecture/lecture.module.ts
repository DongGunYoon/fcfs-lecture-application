import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureEntity } from './infrastructure/entity/lecture.entity';
import { LectureApplicationHistoryEntity } from './infrastructure/entity/lecture-application-history.entity';
import { LectureController } from './presentation/controller/lecture.controller';
import { lectureServiceSymbol } from './domain/interface/lecture.service';
import { LectureServiceImpl } from './application/service/lecture.service.impl';
import { lectureRepositorySymbol } from './domain/interface/lecture.repository';
import { LectureRepositoryImpl } from './infrastructure/repository/lecture.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([LectureEntity, LectureApplicationHistoryEntity])],
  controllers: [LectureController],
  providers: [
    { provide: lectureServiceSymbol, useClass: LectureServiceImpl },
    { provide: lectureRepositorySymbol, useClass: LectureRepositoryImpl },
  ],
})
export class LectureModule {}
