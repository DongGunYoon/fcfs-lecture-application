import { ReadLectureApplicationsUseCase } from 'src/lecture/domain/interface/use-case/read-lecture-applications.use-case';
import {
  LectureApplicationService,
  lectureApplicationServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-application.service';
import { Inject } from '@nestjs/common';
import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';

export class ReadLectureApplicationsUseCaseImpl implements ReadLectureApplicationsUseCase {
  constructor(
    @Inject(lectureApplicationServiceSymbol) private readonly lectureApplicationService: LectureApplicationService,
  ) {}

  async execute(userId: number): Promise<LectureApplicationDomain[]> {
    return await this.lectureApplicationService.getAllByUserId(userId);
  }
}
