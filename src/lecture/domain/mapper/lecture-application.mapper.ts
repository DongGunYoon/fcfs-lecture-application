import { LectureApplicationEntity } from 'src/lecture/infrastructure/entity/lecture-application.entity';
import { LectureApplicationDomain } from '../model/lecture-application.domain';

export class LectureApplicationMapper {
  static toDomain(entity: LectureApplicationEntity): LectureApplicationDomain {
    return new LectureApplicationDomain(entity.id, entity.userId, entity.lectureScheduleId, entity.appliedAt);
  }

  static toEntity(domain: LectureApplicationDomain): LectureApplicationEntity {
    return {
      id: domain.id,
      userId: domain.userId,
      lectureScheduleId: domain.lectureScheduleId,
      appliedAt: new Date(),
    };
  }
}
