import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';

export class LectureApplicationResponse {
  id: number;
  userId: number;
  userName: string;
  lectureId: number;
  lectureName: string;
  lectureScheduleId: number;
  appliedAt: Date;

  static from(lectureApplication: LectureApplicationDomain): LectureApplicationResponse {
    return {
      id: lectureApplication.id,
      userId: lectureApplication.userId,
      userName: lectureApplication.user!.name,
      lectureId: lectureApplication.lectureId,
      lectureName: lectureApplication.lecture!.name,
      lectureScheduleId: lectureApplication.lectureScheduleId,
      appliedAt: lectureApplication.appliedAt,
    };
  }
}
