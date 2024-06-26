import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureCapacityEntity } from '../entity/lecture-capacity.entity';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { LectureCapacityRepository } from 'src/lecture/domain/interface/lecture-capacity.repository';
import { Nullable } from 'src/common/type/native';
import { LectureCapacityDomain } from 'src/lecture/domain/model/lecture-capacity.domain';
import { LectureCapacityMapper } from 'src/lecture/domain/mapper/lecture-capacity.mapper';

@Injectable()
export class LectureCapacityRepositoryImpl implements LectureCapacityRepository {
  constructor(
    @InjectRepository(LectureCapacityEntity)
    private readonly lectureCapacityRepository: Repository<LectureCapacityEntity>,
  ) {}

  async findOneWithEntityManager(
    entityManager: EntityManager,
    options: FindOneOptions<LectureCapacityEntity>,
  ): Promise<Nullable<LectureCapacityDomain>> {
    const entity = await entityManager.findOne(LectureCapacityEntity, options);

    return entity && LectureCapacityMapper.toDomain(entity);
  }

  async saveWithEntityManager(
    domain: LectureCapacityDomain,
    entityManager: EntityManager,
  ): Promise<LectureCapacityDomain> {
    const entity = await entityManager.save(LectureCapacityMapper.toEntity(domain));

    return LectureCapacityMapper.toDomain(entity);
  }
}
