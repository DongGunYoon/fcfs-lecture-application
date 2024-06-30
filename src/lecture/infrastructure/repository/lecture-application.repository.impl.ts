import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureApplicationRepository } from 'src/lecture/domain/interface/repository/lecture-application.repository';
import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';
import { LectureApplicationEntity } from '../entity/lecture-application.entity';
import { EntityManager, Repository } from 'typeorm';
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

  async existsByUserIdAndLectureScheduleId(userId: number, lectureScheduleId: number): Promise<boolean> {
    return await this.lectureApplicationRepository.existsBy({ userId, lectureScheduleId });
  }

  async findAllByUserId(userId: number): Promise<LectureApplicationDomain[]> {
    const applicationEntities = await this.lectureApplicationRepository.find({
      where: { userId },
      relations: { user: true, lecture: true },
    });

    return applicationEntities.map(entity => LectureApplicationMapper.toDomain(entity));
  }

  async save(domain: LectureApplicationDomain, entityManager?: EntityManager): Promise<LectureApplicationDomain> {
    const lectureEntity = LectureApplicationMapper.toEntity(domain);

    if (entityManager) await entityManager.save(LectureApplicationEntity, lectureEntity);
    else await this.lectureApplicationRepository.save(lectureEntity);

    return LectureApplicationMapper.toDomain(lectureEntity);
  }
}
