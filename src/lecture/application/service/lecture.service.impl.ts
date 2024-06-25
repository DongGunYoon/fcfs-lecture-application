import { LectureService } from 'src/lecture/domain/interface/lecture.service';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { CreateLectureRequest } from '../dto/request/create-lecture.request';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LectureRepository, lectureRepositorySymbol } from 'src/lecture/domain/interface/lecture.repository';
import { ApplyLectureRequest } from '../dto/request/apply-lecture.request';
import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';
import {
  LectureApplicationRepository,
  lectureApplicationRepositorySymbol,
} from 'src/lecture/domain/interface/lecture-application.repository';
import { DataSource, EntityManager } from 'typeorm';
import {
  LectureScheduleRepository,
  lectureScheduleRepositorySymbol,
} from 'src/lecture/domain/interface/lecture-schedule.repository';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

@Injectable()
export class LectureServiceImpl implements LectureService {
  constructor(
    @Inject(lectureRepositorySymbol)
    private readonly lectureRepository: LectureRepository,
    @Inject(lectureScheduleRepositorySymbol)
    private readonly lectureScheduleRepository: LectureScheduleRepository,
    @Inject(lectureApplicationRepositorySymbol)
    private readonly lectureApplicationRepository: LectureApplicationRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(request: CreateLectureRequest): Promise<LectureDomain> {
    const lecture = LectureDomain.create(request.toDTO());

    return await this.lectureRepository.create(lecture);
  }

  async apply(request: ApplyLectureRequest): Promise<LectureApplicationDomain> {
    const lectureApplication = LectureApplicationDomain.create(request.userId, request.lectureScheduleId);

    return await this.dataSource.transaction(async (transactionManager: EntityManager) => {
      const lectureSchedule = await this.lectureScheduleRepository.findOneWithEntityManager(transactionManager, {
        where: { id: lectureApplication.lectureScheduleId },
        lock: { mode: 'pessimistic_write' },
      });

      if (lectureSchedule === null) {
        throw new NotFoundException('강의 스케쥴이 존재하지 않습니다.');
      }

      const applicationCount = await this.lectureApplicationRepository.countByLectureScheduleId(lectureSchedule.id);

      if (lectureSchedule.applicationCapacity <= applicationCount) {
        throw new ConflictException('수강 신청의 최대 정원을 초과 했습니다.');
      }

      const hasAlreadyApplied = await this.lectureApplicationRepository.existsByUserIdAndLectureScheduleId(
        lectureApplication.userId,
        lectureApplication.lectureScheduleId,
      );

      if (hasAlreadyApplied) {
        throw new ConflictException('이미 수강 신청을 완료 했습니다.');
      }

      return await this.lectureApplicationRepository.create(lectureApplication);
    });
  }

  async getLectureSchedules(): Promise<LectureScheduleDomain[]> {
    return await this.lectureScheduleRepository.findAll();
  }

  async getApplications(userId: number): Promise<LectureApplicationDomain[]> {
    return await this.lectureApplicationRepository.findAllByUserId(userId);
  }
}
