import { LectureCapacityEntity } from 'src/lecture/infrastructure/entity/lecture-capacity.entity';
import { LectureCapacityDomain } from '../model/lecture-capacity.domain';
import { LectureScheduleMapper } from './lecture-schedule.mapper';
import { LectureMapper } from './lecture.mapper';

export class LectureCapacityMapper {
  static toDomain(entity: LectureCapacityEntity): LectureCapacityDomain {
    return new LectureCapacityDomain(
      entity.id,
      entity.lectureId,
      entity.lectureScheduleId,
      entity.maxCapacity,
      entity.currentEnrollment,
      entity.createdAt,
      entity.lecture && LectureMapper.toDomain(entity.lecture),
      entity.lectureSchedule && LectureScheduleMapper.toDomain(entity.lectureSchedule),
    );
  }

  static toEntity(domain: LectureCapacityDomain): LectureCapacityEntity {
    const entity = new LectureCapacityEntity();

    entity.id = domain.id;
    entity.lectureId = domain.lectureId;
    entity.lectureScheduleId = domain.lectureScheduleId;
    entity.maxCapacity = domain.maxCapacity;
    entity.currentEnrollment = domain.currentEnrollment;

    if (domain.lecture) {
      entity.lecture = LectureMapper.toEntity(domain.lecture);
    }

    if (domain.lectureSchedule) {
      entity.lectureSchedule = LectureScheduleMapper.toEntity(domain.lectureSchedule);
    }

    return entity;
  }
}
