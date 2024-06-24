import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';

export class LectureApplicationResponse {
  id: number;
  userId: number;
  lectureId: number;
  appliedAt: Date;

  static from(lectureApplication: LectureApplicationDomain): LectureApplicationResponse {
    return {
      id: lectureApplication.id,
      userId: lectureApplication.userId,
      lectureId: lectureApplication.lectureId,
      appliedAt: lectureApplication.appliedAt,
    };
  }
}
