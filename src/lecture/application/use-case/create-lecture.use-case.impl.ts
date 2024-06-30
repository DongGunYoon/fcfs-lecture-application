import { CreateLectureUseCase } from 'src/lecture/domain/interface/use-case/create-lecture.use-case';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { CreateLectureRequest } from '../dto/request/create-lecture.request';
import { LectureService, lectureServiceSymbol } from 'src/lecture/domain/interface/service/lecture.service';
import { Inject } from '@nestjs/common';

export class CreateLectureUseCaseImpl implements CreateLectureUseCase {
  constructor(@Inject(lectureServiceSymbol) private readonly lectureService: LectureService) {}

  async execute(dto: CreateLectureRequest): Promise<LectureDomain> {
    return await this.lectureService.create(dto);
  }
}
