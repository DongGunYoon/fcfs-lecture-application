import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLectureScheduleDTO } from '../dto/create-lecture-schedule.dto';
import { LectureScheduleService } from '../interface/service/lecture-schedule.service';
import { LectureScheduleDomain } from '../model/lecture-schedule.domain';
import {
  LectureScheduleRepository,
  lectureScheduleRepositorySymbol,
} from '../interface/repository/lecture-schedule.repository';

@Injectable()
export class LectureScheduleServiceImpl implements LectureScheduleService {
  constructor(
    @Inject(lectureScheduleRepositorySymbol) private readonly lectureScheduleRepository: LectureScheduleRepository,
  ) {}

  async create(dto: CreateLectureScheduleDTO): Promise<LectureScheduleDomain> {
    const lectureSchedule = LectureScheduleDomain.create(dto);

    return await this.lectureScheduleRepository.create(lectureSchedule);
  }

  async validateAppliable(id: number): Promise<LectureScheduleDomain> {
    const lectureSchedule = await this.lectureScheduleRepository.findOneById(id);

    if (!lectureSchedule) {
      throw new NotFoundException('강의 스케쥴이 존재하지 않습니다.');
    }

    lectureSchedule.validateAppliable();

    return lectureSchedule;
  }

  async getAll(): Promise<LectureScheduleDomain[]> {
    return await this.lectureScheduleRepository.findAll({
      relations: { lecture: true, lectureCapacity: true },
      order: { startAt: 'ASC' },
    });
  }
}
