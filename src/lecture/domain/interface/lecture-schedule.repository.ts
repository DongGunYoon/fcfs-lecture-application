import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { FindManyOptions } from 'typeorm';
import { LectureScheduleDomain } from '../model/lecture-schedule.domain';

export const lectureScheduleRepositorySymbol = Symbol.for('LectureScheduleRepository');

export interface LectureScheduleRepository {
  create(domain: LectureScheduleDomain): Promise<LectureScheduleDomain>;
  findAll(options: FindManyOptions<LectureScheduleEntity>): Promise<LectureScheduleDomain[]>;
}
