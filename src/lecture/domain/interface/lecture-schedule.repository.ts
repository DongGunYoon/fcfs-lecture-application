import { Nullable } from 'src/common/type/native';
import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { EntityManager, FindOneOptions } from 'typeorm';
import { LectureScheduleDomain } from '../model/lecture-schedule.domain';

export const lectureScheduleRepositorySymbol = Symbol.for('LectureScheduleRepository');

export interface LectureScheduleRepository {
  findOneWithEntityManager(
    entityManager: EntityManager,
    options: FindOneOptions<LectureScheduleEntity>,
  ): Promise<Nullable<LectureScheduleDomain>>;
  findAll(): Promise<LectureScheduleDomain[]>;
}
