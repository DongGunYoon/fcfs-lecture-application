import { EntityManager } from 'typeorm';
import { LectureCapacityService } from '../interface/service/lecture-capacity.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  LectureCapacityRepository,
  lectureCapacityRepositorySymbol,
} from '../interface/repository/lecture-capacity.repository';

@Injectable()
export class LectureCapacityServiceImpl implements LectureCapacityService {
  constructor(
    @Inject(lectureCapacityRepositorySymbol) private readonly lectureCapacityRepository: LectureCapacityRepository,
  ) {}

  async enroll(lectureScheduleId: number, entityManager: EntityManager): Promise<void> {
    const lectureCapacity = await this.lectureCapacityRepository.findOneWithEntityManager(entityManager, {
      where: { lectureScheduleId },
      relations: { lectureSchedule: true },
      lock: { mode: 'pessimistic_write' },
    });

    if (!lectureCapacity) {
      throw new NotFoundException('강의 스케쥴이 존재하지 않습니다.');
    }

    lectureCapacity.enroll();

    await this.lectureCapacityRepository.save(lectureCapacity, entityManager);
  }
}
