import { EntityManager } from 'typeorm';
import { LectureApplicationDomain } from '../../model/lecture-application.domain';

export const lectureApplicationRepositorySymbol = Symbol.for('LectureApplicationRepository');

export interface LectureApplicationRepository {
  create(lectureApplication: LectureApplicationDomain): Promise<LectureApplicationDomain>;
  existsByUserIdAndLectureScheduleId(userId: number, lectureScheduleId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<LectureApplicationDomain[]>;
  save(domain: LectureApplicationDomain, entityManager?: EntityManager): Promise<LectureApplicationDomain>;
}
