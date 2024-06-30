import { IsInt } from 'class-validator';
import { CreateLectureApplicationDTO } from 'src/lecture/domain/dto/create-lecture-application.dto';

export class ApplyLectureRequest {
  constructor(userId: number, lectureScheduleId: number) {
    this.userId = userId;
    this.lectureScheduleId = lectureScheduleId;
  }

  @IsInt()
  userId: number;

  @IsInt()
  lectureScheduleId: number;

  toCreateLectureApplicationDTO(lectureId: number): CreateLectureApplicationDTO {
    return {
      userId: this.userId,
      lectureId: lectureId,
      lectureScheduleId: this.lectureScheduleId,
    };
  }
}
