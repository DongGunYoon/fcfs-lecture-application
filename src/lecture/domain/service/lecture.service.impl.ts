import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { LectureService } from '../interface/service/lecture.service';
import { LectureRepository, lectureRepositorySymbol } from '../interface/repository/lecture.repository';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureDomain } from '../model/lecture.domain';

@Injectable()
export class LectureServiceImpl implements LectureService {
  constructor(
    @Inject(lectureRepositorySymbol)
    private readonly lectureRepository: LectureRepository,
  ) {}

  async create(request: CreateLectureRequest): Promise<LectureDomain> {
    const lecture = LectureDomain.create(request.toDTO());

    return await this.lectureRepository.create(lecture);
  }

  async getByIdOrThrow(id: number): Promise<LectureDomain> {
    const lecture = await this.lectureRepository.findOneById(id);

    if (!lecture) {
      throw new NotFoundException('강의가 존재하지 않습니다.');
    }

    return lecture;
  }
}
