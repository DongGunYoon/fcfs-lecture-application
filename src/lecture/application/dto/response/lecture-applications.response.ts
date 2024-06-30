import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';
import { LectureApplicationResponse } from './lecture-application.response';

export class LectureApplicationsResponse {
  static from(lectureApplications: LectureApplicationDomain[]): LectureApplicationResponse[] {
    return lectureApplications.map(lectureApplication => LectureApplicationResponse.from(lectureApplication));
  }
}
