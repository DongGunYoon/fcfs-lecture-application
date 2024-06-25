import { EntityManager, FindOneOptions } from 'typeorm';
import { LectureDomain } from '../model/lecture.domain';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { Nullable } from 'src/common/type/native';

export const lectureRepositorySymbol = Symbol.for('LectureRepository');

export interface LectureRepository {
  create(lecture: LectureDomain): Promise<LectureDomain>;
  findOneWithEntityManager(
    entityManager: EntityManager,
    options: FindOneOptions<LectureEntity>,
  ): Promise<Nullable<LectureDomain>>;
  findAll(): Promise<LectureDomain[]>;
}
