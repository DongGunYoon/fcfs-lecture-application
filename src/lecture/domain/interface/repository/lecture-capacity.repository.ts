import { LectureCapacityEntity } from 'src/lecture/infrastructure/entity/lecture-capacity.entity';
import { EntityManager, FindOneOptions } from 'typeorm';
import { LectureCapacityDomain } from '../../model/lecture-capacity.domain';
import { Nullable } from 'src/common/type/native';

export const lectureCapacityRepositorySymbol = Symbol.for('LectureCapacityRepository');

export interface LectureCapacityRepository {
  findOneWithEntityManager(
    entityManager: EntityManager,
    options: FindOneOptions<LectureCapacityEntity>,
  ): Promise<Nullable<LectureCapacityDomain>>;
  save(domain: LectureCapacityDomain, entityManager?: EntityManager): Promise<LectureCapacityDomain>;
}
