import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureScheduleRepository } from 'src/lecture/domain/interface/lecture-schedule.repository';
import { LectureScheduleEntity } from '../entity/lecture-schedule.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';

@Injectable()
export class LectureScheduleRepositoryImpl implements LectureScheduleRepository {
  constructor(
    @InjectRepository(LectureScheduleEntity)
    private readonly lectureScheduleRepository: Repository<LectureScheduleEntity>,
  ) {}

  async create(domain: LectureScheduleDomain): Promise<LectureScheduleDomain> {
    const lectureSchduleEntity = await this.lectureScheduleRepository.save(LectureScheduleMapper.toEntity(domain));

    return LectureScheduleMapper.toDomain(lectureSchduleEntity);
  }

  async findAll(options: FindManyOptions<LectureScheduleEntity>): Promise<LectureScheduleDomain[]> {
    const lectureScheduleEntities = await this.lectureScheduleRepository.find(options);

    return lectureScheduleEntities.map(entity => LectureScheduleMapper.toDomain(entity));
  }
}
