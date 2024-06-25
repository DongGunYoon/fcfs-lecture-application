import { IsInt } from 'class-validator';

export class ApplyLectureRequest {
  @IsInt()
  userId: number;

  @IsInt()
  lectureScheduleId: number;
}
