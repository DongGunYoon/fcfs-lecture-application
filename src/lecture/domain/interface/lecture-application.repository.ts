import { LectureApplicationDomain } from '../model/lecture-application.domain';

export const lectureApplicationRepositorySymbol = Symbol.for('LectureApplicationRepository');

export interface LectureApplicationRepository {
  create(lectureApplication: LectureApplicationDomain): Promise<LectureApplicationDomain>;
  countByLectureScheduleId(lectureScheduleId: number): Promise<number>;
  existsByUserIdAndLectureScheduleId(userId: number, lectureScheduleId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<LectureApplicationDomain[]>;
}
