import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureScheduleResponse } from './lecture-schedule.response';

export class LectureSchedulesResponse {
  static from(lectureSchedules: LectureScheduleDomain[]): LectureScheduleResponse[] {
    return lectureSchedules.map(lectureSchedule => LectureScheduleResponse.from(lectureSchedule));
  }
}
