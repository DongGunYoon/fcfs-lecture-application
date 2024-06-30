import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureDomain } from '../model/lecture.domain';

export class LectureMapper {
  static toDomain(entity: LectureEntity): LectureDomain {
    return new LectureDomain(entity.id, entity.name, entity.description, entity.createdAt);
  }

  static toEntity(domain: LectureDomain): LectureEntity {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      createdAt: domain.createdAt,
    };
  }
}
