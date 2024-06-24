import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';

export class LectureResponse {
  id: number;
  name: string;
  applicationCapacity: number;
  applicationStartAt: Date;
  startAt: Date;
  endAt: Date;
  createdAt: Date;

  static from(lecture: LectureDomain): LectureResponse {
    return {
      id: lecture.id,
      name: lecture.name,
      applicationCapacity: lecture.applicationCapacity,
      applicationStartAt: lecture.applicationStartAt,
      startAt: lecture.startAt,
      endAt: lecture.endAt,
      createdAt: lecture.createdAt,
    };
  }
}
