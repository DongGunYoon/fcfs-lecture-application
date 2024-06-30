import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureScheduleRepository } from 'src/lecture/domain/interface/repository/lecture-schedule.repository';
import { LectureScheduleEntity } from '../entity/lecture-schedule.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';
import { Nullable } from 'src/common/type/native';

@Injectable()
export class LectureScheduleRepositoryImpl implements LectureScheduleRepository {
  constructor(
    @InjectRepository(LectureScheduleEntity)
    private readonly lectureScheduleRepository: Repository<LectureScheduleEntity>,
  ) {}

  async create(domain: LectureScheduleDomain): Promise<LectureScheduleDomain> {
    const lectureSchduleEntity = await this.lectureScheduleRepository.save(LectureScheduleMapper.toEntity(domain));

    const lectureSchduleWithRelations = await this.lectureScheduleRepository.findOneOrFail({
      where: { id: lectureSchduleEntity.id },
      relations: { lecture: true, lectureCapacity: true },
    });

    return LectureScheduleMapper.toDomain(lectureSchduleWithRelations);
  }

  async findAll(options: FindManyOptions<LectureScheduleEntity>): Promise<LectureScheduleDomain[]> {
    const lectureScheduleEntities = await this.lectureScheduleRepository.find(options);

    return lectureScheduleEntities.map(entity => LectureScheduleMapper.toDomain(entity));
  }

  async findOneById(id: number): Promise<Nullable<LectureScheduleDomain>> {
    const lectureScheduleEntity = await this.lectureScheduleRepository.findOneBy({ id });

    return lectureScheduleEntity && LectureScheduleMapper.toDomain(lectureScheduleEntity);
  }
}
