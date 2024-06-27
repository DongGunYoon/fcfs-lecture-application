import { ReadLectureApplicationsUseCase } from 'src/lecture/domain/interface/use-case/read-lecture-applications.use-case';
import { LectureApplicationResponse } from '../dto/response/lecture-application.response';
import {
  LectureApplicationService,
  lectureApplicationServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-application.service';
import { Inject } from '@nestjs/common';

export class ReadLectureApplicationsUseCaseImpl implements ReadLectureApplicationsUseCase {
  constructor(
    @Inject(lectureApplicationServiceSymbol) private readonly lectureApplicationService: LectureApplicationService,
  ) {}

  async execute(userId: number): Promise<LectureApplicationResponse[]> {
    return await this.lectureApplicationService.getAllByUserId(userId);
  }
}
