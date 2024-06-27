import { BadRequestException } from '@nestjs/common';
import { LectureDomain } from './lecture.domain';
import { CreateLectureApplicationDTO } from '../dto/create-lecture-application.dto';
import { UserDomain } from 'src/user/domain/model/user.domain';

export class LectureApplicationDomain {
  constructor(
    public id: number,
    public userId: number,
    public lectureId: number,
    public lectureScheduleId: number,
    public appliedAt: Date,
    public user?: UserDomain,
    public lecture?: LectureDomain,
  ) {}

  static create(dto: CreateLectureApplicationDTO) {
    if (dto.userId <= 0) {
      throw new BadRequestException('유효하지 않은 유저 ID 입니다.');
    }

    if (dto.lectureScheduleId <= 0) {
      throw new BadRequestException('유효하지 않은 강의 스케쥴 ID 입니다.');
    }

    return new LectureApplicationDomain(0, dto.userId, dto.lectureId, dto.lectureScheduleId, new Date());
  }
}
