import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

export class LectureScheduleResponse {
  id: number;
  applicationCapacity: number;
  applicationStartAt: Date;
  startAt: Date;
  endAt: Date;

  static from(lectureSchedule: LectureScheduleDomain): LectureScheduleResponse {
    return {
      id: lectureSchedule.id,
      applicationCapacity: lectureSchedule.applicationCapacity,
      applicationStartAt: lectureSchedule.applicationStartAt,
      startAt: lectureSchedule.startAt,
      endAt: lectureSchedule.endAt,
    };
  }
}
