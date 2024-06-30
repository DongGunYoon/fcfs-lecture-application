import { LectureApplicationEntity } from 'src/lecture/infrastructure/entity/lecture-application.entity';
import { LectureApplicationDomain } from '../model/lecture-application.domain';
import { LectureMapper } from './lecture.mapper';
import { UserMapper } from 'src/user/domain/mapper/user.mapper';

export class LectureApplicationMapper {
  static toDomain(entity: LectureApplicationEntity): LectureApplicationDomain {
    return new LectureApplicationDomain(
      entity.id,
      entity.userId,
      entity.lectureId,
      entity.lectureScheduleId,
      entity.appliedAt,
      entity.user && UserMapper.toDomain(entity.user),
      entity.lecture && LectureMapper.toDomain(entity.lecture),
    );
  }

  static toEntity(domain: LectureApplicationDomain): LectureApplicationEntity {
    const entity = new LectureApplicationEntity();

    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.lectureId = domain.lectureId;
    entity.lectureScheduleId = domain.lectureScheduleId;

    return entity;
  }
}
