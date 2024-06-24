import { LectureService } from 'src/lecture/domain/interface/lecture.service';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { CreateLectureRequest } from '../dto/request/create-lecture.request';
import { Inject, Injectable } from '@nestjs/common';
import { LectureRepository, lectureRepositorySymbol } from 'src/lecture/domain/interface/lecture.repository';

@Injectable()
export class LectureServiceImpl implements LectureService {
  constructor(@Inject(lectureRepositorySymbol) private readonly lectureRepository: LectureRepository) {}

  async create(request: CreateLectureRequest): Promise<LectureDomain> {
    const lecture = LectureDomain.create(request.toDTO());

    return await this.lectureRepository.create(lecture);
  }
}
