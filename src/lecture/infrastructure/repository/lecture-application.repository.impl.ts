import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureApplicationRepository } from 'src/lecture/domain/interface/lecture-application.repository';
import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';
import { LectureApplicationEntity } from '../entity/lecture-application.entity';
import { Repository } from 'typeorm';
import { LectureApplicationMapper } from 'src/lecture/domain/mapper/lecture-application.mapper';

@Injectable()
export class LectureApplicationRepositoryImpl implements LectureApplicationRepository {
  constructor(
    @InjectRepository(LectureApplicationEntity)
    private readonly lectureApplicationRepository: Repository<LectureApplicationEntity>,
  ) {}

  async create(lectureApplication: LectureApplicationDomain): Promise<LectureApplicationDomain> {
    const lectureApplicationEntity = await this.lectureApplicationRepository.save(
      LectureApplicationMapper.toEntity(lectureApplication),
    );

    return LectureApplicationMapper.toDomain(lectureApplicationEntity);
  }

  async countByLectureId(lectureId: number): Promise<number> {
    return await this.lectureApplicationRepository.count({ where: { lectureId } });
  }

  async existsByUserIdAndLectureId(userId: number, lectureId: number): Promise<boolean> {
    return await this.lectureApplicationRepository.existsBy({ userId, lectureId });
  }

  async findAllByUserId(userId: number): Promise<LectureApplicationDomain[]> {
    const applicationEntites = await this.lectureApplicationRepository.findBy({ userId });

    return applicationEntites.map(entity => LectureApplicationMapper.toDomain(entity));
  }
}
