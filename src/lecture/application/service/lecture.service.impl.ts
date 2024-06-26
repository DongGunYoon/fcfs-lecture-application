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
import { CreateLectureScheduleDTO } from 'src/lecture/domain/dto/create-lecture-schedule.dto';
import {
  LectureCapacityRepository,
  lectureCapacityRepositorySymbol,
} from 'src/lecture/domain/interface/lecture-capacity.repository';

@Injectable()
export class LectureServiceImpl implements LectureService {
  constructor(
    @Inject(lectureRepositorySymbol)
    private readonly lectureRepository: LectureRepository,
    @Inject(lectureScheduleRepositorySymbol)
    private readonly lectureScheduleRepository: LectureScheduleRepository,
    @Inject(lectureCapacityRepositorySymbol)
    private readonly lectureCapacityRepository: LectureCapacityRepository,
    @Inject(lectureApplicationRepositorySymbol)
    private readonly lectureApplicationRepository: LectureApplicationRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(request: CreateLectureRequest): Promise<LectureDomain> {
    const lecture = LectureDomain.create(request.toDTO());

    return await this.lectureRepository.create(lecture);
  }

  async apply(request: ApplyLectureRequest): Promise<void> {
    const lectureApplication = LectureApplicationDomain.create(request.userId, request.lectureScheduleId);

    await this.dataSource.transaction(async (transactionManager: EntityManager) => {
      const lectureCapacity = await this.lectureCapacityRepository.findOneWithEntityManager(transactionManager, {
        where: { lectureScheduleId: request.lectureScheduleId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!lectureCapacity) {
        throw new NotFoundException('강의 스케쥴이 존재하지 않습니다.');
      }

      lectureCapacity.enroll();

      const hasAlreadyApplied = await this.lectureApplicationRepository.existsByUserIdAndLectureScheduleId(
        lectureApplication.userId,
        lectureApplication.lectureScheduleId,
      );

      if (hasAlreadyApplied) {
        throw new ConflictException('이미 수강 신청을 완료 했습니다.');
      }

      await this.lectureApplicationRepository.create(lectureApplication);
      await this.lectureCapacityRepository.saveWithEntityManager(lectureCapacity, transactionManager);
    });
  }

  async getLectureSchedules(): Promise<LectureScheduleDomain[]> {
    return await this.lectureScheduleRepository.findAll({
      relations: { lecture: true, lectureCapacity: true },
      order: { startAt: 'ASC' },
    });
  }

  async createLectureSchedule(dto: CreateLectureScheduleDTO): Promise<LectureScheduleDomain> {
    const lectureSchedule = LectureScheduleDomain.create(dto);
    lectureSchedule.lecture = await this.getOrThrow(dto.lectureId);

    return await this.lectureScheduleRepository.create(lectureSchedule);
  }

  async getApplications(userId: number): Promise<LectureApplicationDomain[]> {
    return await this.lectureApplicationRepository.findAllByUserId(userId);
  }

  private async getOrThrow(lectureId: number): Promise<LectureDomain> {
    const lecture = await this.lectureRepository.findOneById(lectureId);

    if (!lecture) {
      throw new NotFoundException('강의가 존재하지 않습니다.');
    }

    return lecture;
  }
}
