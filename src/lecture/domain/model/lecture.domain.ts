import { BadRequestException } from '@nestjs/common';
import { CreateLectureDTO } from '../dto/create-lecture.dto';

export class LectureDomain {
  constructor(
    public id: number,
    public name: string,
    public applicationCapacity: number,
    public applicationStartAt: Date,
    public startAt: Date,
    public endAt: Date,
    public createdAt: Date,
  ) {}

  static create(dto: CreateLectureDTO) {
    const trimmedName = dto.name.trim();

    if (trimmedName.length == 0) {
      throw new BadRequestException('이름은 최소 1글자 이상이어야 합니다.');
    }

    if (trimmedName.length > 200) {
      throw new BadRequestException('이름이 최대 길이를 초과했습니다.');
    }

    if (dto.applicationCapacity <= 0) {
      throw new BadRequestException('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    }

    if (dto.startAt > dto.endAt) {
      throw new BadRequestException('강의 시작 시간이 강의 종료 시간보다 늦을 수 없습니다.');
    }

    return new LectureDomain(
      null,
      trimmedName,
      dto.applicationCapacity,
      dto.applicationStartAt,
      dto.startAt,
      dto.endAt,
      null,
    );
  }
}
