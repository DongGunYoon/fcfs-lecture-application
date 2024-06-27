import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { LectureApplicationService } from '../interface/service/lecture-application.service';
import { LectureApplicationDomain } from '../model/lecture-application.domain';
import {
  LectureApplicationRepository,
  lectureApplicationRepositorySymbol,
} from '../interface/repository/lecture-application.repository';
import { CreateLectureApplicationDTO } from '../dto/create-lecture-application.dto';
import { EntityManager } from 'typeorm';

@Injectable()
export class LectureApplicationServiceImpl implements LectureApplicationService {
  constructor(
    @Inject(lectureApplicationRepositorySymbol)
    private readonly lectureApplicationRepository: LectureApplicationRepository,
  ) {}

  async create(dto: CreateLectureApplicationDTO, entityManager: EntityManager): Promise<LectureApplicationDomain> {
    await this.validateApplicable(dto.userId, dto.lectureScheduleId);

    const lectureApplication = LectureApplicationDomain.create(dto);

    return await this.lectureApplicationRepository.save(lectureApplication, entityManager);
  }

  private async validateApplicable(userId: number, lectureScheduleId: number): Promise<void> {
    const hasAlreadyApplied = await this.lectureApplicationRepository.existsByUserIdAndLectureScheduleId(
      userId,
      lectureScheduleId,
    );

    if (hasAlreadyApplied) {
      throw new ConflictException('이미 수강 신청을 완료 했습니다.');
    }
  }

  async getAllByUserId(userId: number): Promise<LectureApplicationDomain[]> {
    return await this.lectureApplicationRepository.findAllByUserId(userId);
  }
}
