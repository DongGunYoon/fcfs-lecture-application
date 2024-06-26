import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

export class LectureScheduleResponse {
  id: number;
  applicationStartAt: Date;
  startAt: Date;
  endAt: Date;
  lectureName: string;
  maxCapacity: number;
  currentEnrollment: number;

  static from(lectureSchedule: LectureScheduleDomain): LectureScheduleResponse {
    return {
      id: lectureSchedule.id,
      applicationStartAt: lectureSchedule.applicationStartAt,
      startAt: lectureSchedule.startAt,
      endAt: lectureSchedule.endAt,
      lectureName: lectureSchedule.lecture!.name,
      maxCapacity: lectureSchedule.lectureCapacity!.maxCapacity,
      currentEnrollment: lectureSchedule.lectureCapacity!.currentEnrollment,
    };
  }
}
