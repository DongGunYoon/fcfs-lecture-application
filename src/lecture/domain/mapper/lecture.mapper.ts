import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureDomain } from '../model/lecture.domain';

export class LectureMapper {
  static toDomain(entity: LectureEntity): LectureDomain {
    return new LectureDomain(
      entity.id,
      entity.name,
      entity.applicationCapacity,
      entity.applicationStartAt,
      entity.startAt,
      entity.endAt,
      entity.createdAt,
    );
  }

  static toEntity(domain: LectureDomain): LectureEntity {
    return {
      id: domain.id,
      name: domain.name,
      applicationCapacity: domain.applicationCapacity,
      applicationStartAt: domain.applicationStartAt,
      startAt: domain.startAt,
      endAt: domain.endAt,
      createdAt: undefined,
    };
  }
}
