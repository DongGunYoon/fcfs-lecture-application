import { EntityManager } from 'typeorm';

export const lectureCapacityServiceSymbol = Symbol.for('LectureCapacityService');

export interface LectureCapacityService {
  enroll(lectureScheduleId: number, entityManager: EntityManager): Promise<void>;
}
