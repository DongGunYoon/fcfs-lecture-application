import { IsInt } from 'class-validator';

export class ApplyLectureRequest {
  @IsInt()
  userId: number;

  @IsInt()
  lectureId: number;
}
