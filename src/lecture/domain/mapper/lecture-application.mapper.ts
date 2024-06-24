import { LectureApplicationEntity } from 'src/lecture/infrastructure/entity/lecture-application.entity';
import { LectureApplicationDomain } from '../model/lecture-application.domain';

export class LectureApplicationMapper {
  static toDomain(entity: LectureApplicationEntity): LectureApplicationDomain {
    return new LectureApplicationDomain(entity.id, entity.userId, entity.lectureId, entity.appliedAt);
  }

  static toEntity(domain: LectureApplicationDomain): LectureApplicationEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      lectureId: domain.lectureId,
      appliedAt: undefined,
    };
  }
}
