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

@Injectable()
export class LectureServiceImpl implements LectureService {
  constructor(
    @Inject(lectureRepositorySymbol)
    private readonly lectureRepository: LectureRepository,
    @Inject(lectureApplicationRepositorySymbol)
    private readonly lectureApplicationRepository: LectureApplicationRepository,
    private readonly dataSource: DataSource,
  ) {}

  async create(request: CreateLectureRequest): Promise<LectureDomain> {
    const lecture = LectureDomain.create(request.toDTO());

    return await this.lectureRepository.create(lecture);
  }

  async apply(request: ApplyLectureRequest): Promise<LectureApplicationDomain> {
    const lectureApplication = LectureApplicationDomain.create(request.userId, request.lectureId);

    return await this.dataSource.transaction(async (transactionManager: EntityManager) => {
      const lecture = await this.lectureRepository.findOneWithEntityManager(transactionManager, {
        where: { id: lectureApplication.lectureId },
        lock: { mode: 'pessimistic_write' },
      });

      if (lecture === null) {
        throw new NotFoundException('강의가 존재하지 않습니다.');
      }

      const applicationCount = await this.lectureApplicationRepository.countByLectureId(lecture.id);

      if (lecture.applicationCapacity <= applicationCount) {
        throw new ConflictException('수강 신청의 최대 정원을 초과 했습니다.');
      }

      const hasAlreadyApplied = await this.lectureApplicationRepository.findOneByUserIdAndLectureId(
        lectureApplication.userId,
        lectureApplication.lectureId,
      );

      if (hasAlreadyApplied) {
        throw new ConflictException('이미 수강 신청을 완료 했습니다.');
      }

      return await this.lectureApplicationRepository.create(lectureApplication);
    });
  }
}
