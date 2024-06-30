import { Inject } from '@nestjs/common';
import {
  LectureScheduleService,
  lectureScheduleServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-schedule.service';
import { ScanLectureSchedulesUseCase } from 'src/lecture/domain/interface/use-case/scan-lecture-schedules.use-case';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

export class ScanLectureSchedulesUseCaseImpl implements ScanLectureSchedulesUseCase {
  constructor(@Inject(lectureScheduleServiceSymbol) private readonly lectureScheduleService: LectureScheduleService) {}

  async execute(): Promise<LectureScheduleDomain[]> {
    return await this.lectureScheduleService.getAll();
  }
}
