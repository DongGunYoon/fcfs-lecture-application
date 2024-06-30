import { EntityManager } from 'typeorm';
import { LectureApplicationDomain } from '../../model/lecture-application.domain';
import { CreateLectureApplicationDTO } from '../../dto/create-lecture-application.dto';

export const lectureApplicationServiceSymbol = Symbol.for('LectureApplicationService');

export interface LectureApplicationService {
  create(dto: CreateLectureApplicationDTO, entityManager: EntityManager): Promise<LectureApplicationDomain>;
  getAllByUserId(userId: number): Promise<LectureApplicationDomain[]>;
}
