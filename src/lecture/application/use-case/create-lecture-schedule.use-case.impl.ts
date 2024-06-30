import { Inject } from '@nestjs/common';
import { CreateLectureScheduleDTO } from 'src/lecture/domain/dto/create-lecture-schedule.dto';
import {
  LectureScheduleService,
  lectureScheduleServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-schedule.service';
import { LectureService, lectureServiceSymbol } from 'src/lecture/domain/interface/service/lecture.service';
import { CreateLectureScheduleUseCase } from 'src/lecture/domain/interface/use-case/create-lecture-schedule.use-case';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

export class CreateLectureScheduleUseCaseImpl implements CreateLectureScheduleUseCase {
  constructor(
    @Inject(lectureServiceSymbol) private readonly lectureService: LectureService,
    @Inject(lectureScheduleServiceSymbol) private readonly lectureScheduleService: LectureScheduleService,
  ) {}

  async execute(dto: CreateLectureScheduleDTO): Promise<LectureScheduleDomain> {
    await this.lectureService.getByIdOrThrow(dto.lectureId);

    return await this.lectureScheduleService.create(dto);
  }
}
