import { BadRequestException } from '@nestjs/common';
import { CreateLectureDTO } from '../dto/create-lecture.dto';
import { Nullable } from 'src/common/type/native';

export class LectureDomain {
  constructor(
    public id: number,
    public name: string,
    public description: Nullable<string>,
    public createdAt: Date,
  ) {}

  static create(dto: CreateLectureDTO) {
    const trimmedName = dto.name.trim();
    const trimmedDescription = dto.description && dto.description.trim();

    if (trimmedName.length == 0) {
      throw new BadRequestException('이름은 최소 1글자 이상이어야 합니다.');
    }

    if (trimmedName.length > 200) {
      throw new BadRequestException('이름이 최대 길이를 초과했습니다.');
    }

    if (trimmedDescription != null && trimmedDescription.length > 5000) {
      throw new BadRequestException('설명이 최대 길이를 초과했습니다.');
    }

    return new LectureDomain(0, trimmedName, trimmedDescription, new Date());
  }
}
