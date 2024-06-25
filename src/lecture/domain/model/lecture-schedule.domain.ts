import { BadRequestException } from '@nestjs/common';
import { CreateLectureScheduleDTO } from '../dto/create-lecture-schedule.dto';

export class LectureScheduleDomain {
  constructor(
    public id: number,
    public lectureId: number,
    public applicationCapacity: number,
    public applicationStartAt: Date,
    public startAt: Date,
    public endAt: Date,
    public createdAt: Date,
  ) {}

  static create(dto: CreateLectureScheduleDTO) {
    if (dto.lectureId <= 0) {
      throw new BadRequestException('유효하지 않은 강의 ID 입니다.');
    }

    if (dto.applicationCapacity <= 0) {
      throw new BadRequestException('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    }

    if (dto.startAt > dto.endAt) {
      throw new BadRequestException('강의 시작 시간이 강의 종료 시간보다 늦을 수 없습니다.');
    }

    return new LectureScheduleDomain(
      0,
      dto.lectureId,
      dto.applicationCapacity,
      dto.applicationStartAt,
      dto.startAt,
      dto.endAt,
      new Date(),
    );
  }
}
