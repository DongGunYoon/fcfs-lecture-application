import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureRepository } from 'src/lecture/domain/interface/lecture.repository';
import { LectureEntity } from '../entity/lecture.entity';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { Repository } from 'typeorm';
import { LectureMapper } from 'src/lecture/domain/mapper/lecture.mapper';
import { Nullable } from 'src/common/type/native';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(@InjectRepository(LectureEntity) private readonly lectureRepository: Repository<LectureEntity>) {}

  async create(lecture: LectureDomain): Promise<LectureDomain> {
    const lectureEntity = await this.lectureRepository.save(LectureMapper.toEntity(lecture));

    return LectureMapper.toDomain(lectureEntity);
  }

  async findOneById(id: number): Promise<Nullable<LectureDomain>> {
    const lectureEntity = await this.lectureRepository.findOneBy({ id });

    return lectureEntity && LectureMapper.toDomain(lectureEntity);
  }
}
