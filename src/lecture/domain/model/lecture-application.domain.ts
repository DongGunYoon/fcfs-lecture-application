import { BadRequestException } from '@nestjs/common';

export class LectureApplicationDomain {
  constructor(
    public id: number,
    public userId: number,
    public lectureId: number,
    public appliedAt: Date,
  ) {}

  static create(userId: number, lectureId: number) {
    if (userId <= 0) {
      throw new BadRequestException('유효하지 않은 유저 ID 입니다.');
    }

    if (lectureId <= 0) {
      throw new BadRequestException('유효하지 않은 강의 ID 입니다.');
    }

    return new LectureApplicationDomain(null, userId, lectureId, null);
  }
}
