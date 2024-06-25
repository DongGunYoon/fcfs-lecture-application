import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureScheduleDomain } from '../model/lecture-schedule.domain';

export class LectureScheduleMapper {
  static toDomain(entity: LectureScheduleEntity): LectureScheduleDomain {
    return new LectureScheduleDomain(
      entity.id,
      entity.applicationCapacity,
      entity.applicationStartAt,
      entity.startAt,
      entity.endAt,
      entity.createdAt,
    );
  }

  static toEntity(domain: LectureScheduleDomain): LectureScheduleEntity {
    return {
      id: domain.id,
      applicationCapacity: domain.applicationCapacity,
      applicationStartAt: domain.applicationStartAt,
      startAt: domain.startAt,
      endAt: domain.endAt,
      createdAt: domain.createdAt,
    };
  }
}
