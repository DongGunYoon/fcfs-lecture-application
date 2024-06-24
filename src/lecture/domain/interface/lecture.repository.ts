import { LectureDomain } from '../model/lecture.domain';

export const lectureRepositorySymbol = Symbol.for('LectureRepository');

export interface LectureRepository {
  create(lecture: LectureDomain): Promise<LectureDomain>;
}
