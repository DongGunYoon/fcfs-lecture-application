import { BadRequestException } from '@nestjs/common';

export class UserDomain {
  constructor(
    public id: number,
    public name: string,
    public createdAt: Date,
  ) {}

  static create(name: string): UserDomain {
    const trimmedName = name.trim();

    if (trimmedName.length == 0) {
      throw new BadRequestException('이름은 최소 1글자 이상이어야 합니다.');
    }

    if (trimmedName.length > 50) {
      throw new BadRequestException('이름이 최대 길이를 초과했습니다.');
    }

    return new UserDomain(0, trimmedName, new Date());
  }
}
