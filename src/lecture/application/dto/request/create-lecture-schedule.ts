import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';
import { CreateLectureScheduleDTO } from 'src/lecture/domain/dto/create-lecture-schedule.dto';

export class CreateLectureScheduleRequest {
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

  toDTO(lectureId: number): CreateLectureScheduleDTO {
    return {
      lectureId: lectureId,
      applicationCapacity: this.applicationCapacity,
      applicationStartAt: this.applicationStartAt,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }
}
