import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureResponse } from './lecture.response';

export class LecturesResponse {
  static from(lectures: LectureDomain[]): LectureResponse[] {
    return lectures.map(lecture => LectureResponse.from(lecture));
  }
}
