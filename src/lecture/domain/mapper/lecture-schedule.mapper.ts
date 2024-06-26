import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureScheduleDomain } from '../model/lecture-schedule.domain';
import { LectureCapacityMapper } from './lecture-capacity.mapper';
import { LectureMapper } from './lecture.mapper';

export class LectureScheduleMapper {
  static toDomain(entity: LectureScheduleEntity): LectureScheduleDomain {
    return new LectureScheduleDomain(
      entity.id,
      entity.lectureId,
      entity.applicationStartAt,
      entity.startAt,
      entity.endAt,
      entity.createdAt,
      entity.lecture && LectureMapper.toDomain(entity.lecture),
      entity.lectureCapacity && LectureCapacityMapper.toDomain(entity.lectureCapacity),
    );
  }

  static toEntity(domain: LectureScheduleDomain): LectureScheduleEntity {
    const entity = new LectureScheduleEntity();

    entity.id = domain.id;
    entity.lectureId = domain.lectureId;
    entity.applicationStartAt = domain.applicationStartAt;
    entity.startAt = domain.startAt;
    entity.endAt = domain.endAt;

    if (domain.lecture) {
      entity.lecture = LectureMapper.toEntity(domain.lecture);
    }

    if (domain.lectureCapacity) {
      entity.lectureCapacity = LectureCapacityMapper.toEntity(domain.lectureCapacity);
    }

    return entity;
  }
}
