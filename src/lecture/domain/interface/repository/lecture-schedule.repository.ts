import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { FindManyOptions } from 'typeorm';
import { LectureScheduleDomain } from '../../model/lecture-schedule.domain';
import { Nullable } from 'src/common/type/native';

export const lectureScheduleRepositorySymbol = Symbol.for('LectureScheduleRepository');

export interface LectureScheduleRepository {
  create(domain: LectureScheduleDomain): Promise<LectureScheduleDomain>;
  findAll(options: FindManyOptions<LectureScheduleEntity>): Promise<LectureScheduleDomain[]>;
  findOneById(id: number): Promise<Nullable<LectureScheduleDomain>>;
}
