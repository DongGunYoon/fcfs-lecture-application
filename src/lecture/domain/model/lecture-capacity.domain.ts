import { BadRequestException, ConflictException } from '@nestjs/common';
import { LectureScheduleDomain } from './lecture-schedule.domain';
import { LectureDomain } from './lecture.domain';

export class LectureCapacityDomain {
  constructor(
    public id: number,
    public lectureId: number,
    public lectureScheduleId: number,
    public maxCapacity: number,
    public currentEnrollment: number = 0,
    public createdAt: Date,
    public lecture?: LectureDomain,
    public lectureSchedule?: LectureScheduleDomain,
  ) {}

  static create(lectureId: number, maxCapacity: number) {
    if (maxCapacity <= 0) {
      throw new BadRequestException('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    }

    return new LectureCapacityDomain(0, lectureId, 0, maxCapacity, 0, new Date());
  }

  enroll() {
    if (this.maxCapacity <= this.currentEnrollment) {
      throw new ConflictException('수강 신청의 최대 정원을 초과 했습니다.');
    }

    this.currentEnrollment++;
  }
}
