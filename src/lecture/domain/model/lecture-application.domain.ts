import { BadRequestException } from '@nestjs/common';

export class LectureApplicationDomain {
  constructor(
    public id: number,
    public userId: number,
    public lectureScheduleId: number,
    public appliedAt: Date,
  ) {}

  static create(userId: number, lectureScheduleId: number) {
    if (userId <= 0) {
      throw new BadRequestException('유효하지 않은 유저 ID 입니다.');
    }

    if (lectureScheduleId <= 0) {
      throw new BadRequestException('유효하지 않은 강의 스케쥴 ID 입니다.');
    }

    return new LectureApplicationDomain(0, userId, lectureScheduleId, new Date());
  }
}
