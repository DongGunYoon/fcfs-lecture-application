import { Nullable } from 'src/common/type/native';
import { LectureDomain } from '../model/lecture.domain';

export const lectureRepositorySymbol = Symbol.for('LectureRepository');

export interface LectureRepository {
  create(lecture: LectureDomain): Promise<LectureDomain>;
  findOneById(id: number): Promise<Nullable<LectureDomain>>;
}
