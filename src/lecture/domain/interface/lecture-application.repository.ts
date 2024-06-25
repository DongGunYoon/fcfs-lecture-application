import { LectureApplicationDomain } from '../model/lecture-application.domain';

export const lectureApplicationRepositorySymbol = Symbol.for('LectureApplicationRepository');

export interface LectureApplicationRepository {
  create(lectureApplication: LectureApplicationDomain): Promise<LectureApplicationDomain>;
  countByLectureId(lectureId: number): Promise<number>;
  existsByUserIdAndLectureId(userId: number, lectureId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<LectureApplicationDomain[]>;
}
