import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureEntity } from './infrastructure/entity/lecture.entity';
import { LectureApplicationEntity } from './infrastructure/entity/lecture-application.entity';
import { LectureController } from './presentation/controller/lecture.controller';
import { lectureServiceSymbol } from './domain/interface/lecture.service';
import { LectureServiceImpl } from './application/service/lecture.service.impl';
import { lectureRepositorySymbol } from './domain/interface/lecture.repository';
import { LectureRepositoryImpl } from './infrastructure/repository/lecture.repository.impl';
import { lectureApplicationRepositorySymbol } from './domain/interface/lecture-application.repository';
import { LectureApplicationRepositoryImpl } from './infrastructure/repository/lecture-application.repository.impl';
import { lectureScheduleRepositorySymbol } from './domain/interface/lecture-schedule.repository';
import { LectureScheduleRepositoryImpl } from './infrastructure/repository/lecture-schedule.repository.impl';
import { LectureScheduleEntity } from './infrastructure/entity/lecture-schedule.entity';
import { LectureCapacityEntity } from './infrastructure/entity/lecture-capacity.entity';
import { lectureCapacityRepositorySymbol } from './domain/interface/lecture-capacity.repository';
import { LectureCapacityRepositoryImpl } from './infrastructure/repository/lecture-capacity.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forFeature([LectureEntity, LectureScheduleEntity, LectureCapacityEntity, LectureApplicationEntity]),
  ],
  controllers: [LectureController],
  providers: [
    { provide: lectureServiceSymbol, useClass: LectureServiceImpl },
    { provide: lectureRepositorySymbol, useClass: LectureRepositoryImpl },
    { provide: lectureScheduleRepositorySymbol, useClass: LectureScheduleRepositoryImpl },
    { provide: lectureCapacityRepositorySymbol, useClass: LectureCapacityRepositoryImpl },
    { provide: lectureApplicationRepositorySymbol, useClass: LectureApplicationRepositoryImpl },
  ],
})
export class LectureModule {}
