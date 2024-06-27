import { BadRequestException } from '@nestjs/common';
import { CreateLectureScheduleDTO } from '../dto/create-lecture-schedule.dto';
import { LectureCapacityDomain } from './lecture-capacity.domain';
import { LectureDomain } from './lecture.domain';

export class LectureScheduleDomain {
  constructor(
    public id: number,
    public lectureId: number,
    public applicationStartAt: Date,
    public startAt: Date,
    public endAt: Date,
    public createdAt: Date,
    public lecture?: LectureDomain,
    public lectureCapacity?: LectureCapacityDomain,
  ) {}

  static create(dto: CreateLectureScheduleDTO) {
    if (dto.lectureId <= 0) {
      throw new BadRequestException('유효하지 않은 강의 ID 입니다.');
    }

    if (dto.startAt > dto.endAt) {
      throw new BadRequestException('강의 시작 시간이 강의 종료 시간보다 늦을 수 없습니다.');
    }

    if (dto.applicationStartAt > dto.startAt) {
      throw new BadRequestException('수강 신청 시작 일자는 강의 시작 일자보다 늦을 수 없습니다.');
    }

    const lectureCapacity = LectureCapacityDomain.create(dto.lectureId, dto.maxCapacity);

    return new LectureScheduleDomain(
      0,
      dto.lectureId,
      dto.applicationStartAt,
      dto.startAt,
      dto.endAt,
      new Date(),
      undefined,
      lectureCapacity,
    );
  }

  validateAppliable(): void {
    if (this.applicationStartAt > new Date()) {
      throw new BadRequestException('수강 신청 가능 일자가 아닙니다.');
    }
  }
}
