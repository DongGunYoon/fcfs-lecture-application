import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureEntity } from './infrastructure/entity/lecture.entity';
import { LectureApplicationEntity } from './infrastructure/entity/lecture-application.entity';
import { LectureController } from './presentation/controller/lecture.controller';
import { lectureRepositorySymbol } from './domain/interface/repository/lecture.repository';
import { LectureRepositoryImpl } from './infrastructure/repository/lecture.repository.impl';
import { lectureApplicationRepositorySymbol } from './domain/interface/repository/lecture-application.repository';
import { LectureApplicationRepositoryImpl } from './infrastructure/repository/lecture-application.repository.impl';
import { lectureScheduleRepositorySymbol } from './domain/interface/repository/lecture-schedule.repository';
import { LectureScheduleRepositoryImpl } from './infrastructure/repository/lecture-schedule.repository.impl';
import { LectureScheduleEntity } from './infrastructure/entity/lecture-schedule.entity';
import { LectureCapacityEntity } from './infrastructure/entity/lecture-capacity.entity';
import { lectureCapacityRepositorySymbol } from './domain/interface/repository/lecture-capacity.repository';
import { LectureCapacityRepositoryImpl } from './infrastructure/repository/lecture-capacity.repository.impl';
import { UserModule } from 'src/user/user.module';
import { applyLectureUseCaseSymbol } from './domain/interface/use-case/apply-lecture.use-case';
import { ApplyLectureUseCaseImpl } from './application/use-case/apply-lecture.use-case.impl';
import { createLectureScheduleUseCaseSymbol } from './domain/interface/use-case/create-lecture-schedule.use-case';
import { CreateLectureScheduleUseCaseImpl } from './application/use-case/create-lecture-schedule.use-case.impl';
import { createLectureUseCaseSymbol } from './domain/interface/use-case/create-lecture.use-case';
import { CreateLectureUseCaseImpl } from './application/use-case/create-lecture.use-case.impl';
import { readLectureApplicationsUseCaseSymbol } from './domain/interface/use-case/read-lecture-applications.use-case';
import { ReadLectureApplicationsUseCaseImpl } from './application/use-case/read-lecture-applications.use-case.impl';
import { scanLectureSchedulesUseCaseSymbol } from './domain/interface/use-case/scan-lecture-schedules.use-case';
import { ScanLectureSchedulesUseCaseImpl } from './application/use-case/scan-lecture-schedules.use-case.impl';
import { lectureServiceSymbol } from './domain/interface/service/lecture.service';
import { LectureServiceImpl } from './domain/service/lecture.service.impl';
import { lectureApplicationServiceSymbol } from './domain/interface/service/lecture-application.service';
import { LectureApplicationServiceImpl } from './domain/service/lecture-application.service.impl';
import { lectureScheduleServiceSymbol } from './domain/interface/service/lecture-schedule.service';
import { LectureScheduleServiceImpl } from './domain/service/lecture-schedule.service.impl';
import { lectureCapacityServiceSymbol } from './domain/interface/service/lecture-capacity.service';
import { LectureCapacityServiceImpl } from './domain/service/lecture-capacity.service.impl';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([LectureEntity, LectureScheduleEntity, LectureCapacityEntity, LectureApplicationEntity]),
  ],
  controllers: [LectureController],
  providers: [
    // UseCase
    { provide: applyLectureUseCaseSymbol, useClass: ApplyLectureUseCaseImpl },
    { provide: createLectureScheduleUseCaseSymbol, useClass: CreateLectureScheduleUseCaseImpl },
    { provide: createLectureUseCaseSymbol, useClass: CreateLectureUseCaseImpl },
    { provide: readLectureApplicationsUseCaseSymbol, useClass: ReadLectureApplicationsUseCaseImpl },
    { provide: scanLectureSchedulesUseCaseSymbol, useClass: ScanLectureSchedulesUseCaseImpl },

    // Service
    { provide: lectureServiceSymbol, useClass: LectureServiceImpl },
    { provide: lectureApplicationServiceSymbol, useClass: LectureApplicationServiceImpl },
    { provide: lectureScheduleServiceSymbol, useClass: LectureScheduleServiceImpl },
    { provide: lectureCapacityServiceSymbol, useClass: LectureCapacityServiceImpl },

    // Repository
    { provide: lectureRepositorySymbol, useClass: LectureRepositoryImpl },
    { provide: lectureScheduleRepositorySymbol, useClass: LectureScheduleRepositoryImpl },
    { provide: lectureCapacityRepositorySymbol, useClass: LectureCapacityRepositoryImpl },
    { provide: lectureApplicationRepositorySymbol, useClass: LectureApplicationRepositoryImpl },
  ],
})
export class LectureModule {}
