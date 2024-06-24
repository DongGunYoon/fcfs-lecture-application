import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';
import { CreateLectureDTO } from 'src/lecture/domain/dto/create-lecture.dto';

export class CreateLectureRequest {
  @IsString()
  name: string;

  @IsInt()
  applicationCapacity: number;

  @IsDate()
  @Type(() => Date)
  applicationStartAt: Date;

  @IsDate()
  @Type(() => Date)
  startAt: Date;

  @IsDate()
  @Type(() => Date)
  endAt: Date;

  toDTO(): CreateLectureDTO {
    return {
      name: this.name,
      applicationCapacity: this.applicationCapacity,
      applicationStartAt: this.applicationStartAt,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }
}
