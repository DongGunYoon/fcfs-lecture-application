import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureScheduleRepository } from 'src/lecture/domain/interface/lecture-schedule.repository';
import { LectureScheduleEntity } from '../entity/lecture-schedule.entity';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { Nullable } from 'src/common/type/native';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';

@Injectable()
export class LectureScheduleRepositoryImpl implements LectureScheduleRepository {
  constructor(
    @InjectRepository(LectureScheduleEntity)
    private readonly lectureScheduleRepository: Repository<LectureScheduleEntity>,
  ) {}

  async findOneWithEntityManager(
    entityManager: EntityManager,
    options: FindOneOptions<LectureScheduleEntity>,
  ): Promise<Nullable<LectureScheduleDomain>> {
    const lectureScheduleEntity = await entityManager.findOne(LectureScheduleEntity, options);

    return lectureScheduleEntity && LectureScheduleMapper.toDomain(lectureScheduleEntity);
  }

  async findAll(): Promise<LectureScheduleDomain[]> {
    const lectureScheduleEntities = await this.lectureScheduleRepository.find({ order: { startAt: 'ASC' } });

    return lectureScheduleEntities.map(entity => LectureScheduleMapper.toDomain(entity));
  }
}
