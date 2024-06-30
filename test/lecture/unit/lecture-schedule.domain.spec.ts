import { CreateLectureScheduleDTO } from 'src/lecture/domain/dto/create-lecture-schedule.dto';
import { LectureCapacityDomain } from 'src/lecture/domain/model/lecture-capacity.domain';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';

describe('LectureScheduleDomain', () => {
  describe('강의 스케쥴 생성', () => {
    it('강의 스케쥴이 정상적으로 생성되는지 확인합니다', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const lectureSchedule = LectureScheduleDomain.create(dto);

      // Then
      expect(lectureSchedule).toBeInstanceOf(LectureScheduleDomain);
      expect(lectureSchedule.lectureId).toBe(dto.lectureId);
      expect(lectureSchedule.startAt).toEqual(dto.startAt);
      expect(lectureSchedule.endAt).toEqual(dto.endAt);
    });

    it('강의 스케쥴 생성 시, 강의 수용 데이터도 정상적으로 생성되는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const lectureSchedule = LectureScheduleDomain.create(dto);
      const lectureCapacity = lectureSchedule.lectureCapacity!;

      // Then
      expect(lectureCapacity).toBeInstanceOf(LectureCapacityDomain);
      expect(lectureCapacity.maxCapacity).toBe(dto.maxCapacity);
      expect(lectureCapacity.currentEnrollment).toBe(0);
    });

    it('유효하지 않은 강의 아이디로 생성 시, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: -1,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = () => LectureScheduleDomain.create(dto);

      // Then
      expect(execute).toThrow('유효하지 않은 강의 ID 입니다.');
    });

    it('강의 시작 시간이 종료 시간보다 늦은 경우, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(Date.now() + 1000),
        endAt: new Date(),
      };

      // When
      const execute = () => LectureScheduleDomain.create(dto);

      // Then
      expect(execute).toThrow('강의 시작 시간이 강의 종료 시간보다 늦을 수 없습니다.');
    });

    it('수강 신청 시작 시간이 강의 시작 시간보다 늦은 경우, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: new Date(Date.now() + 1000),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = () => LectureScheduleDomain.create(dto);

      // Then
      expect(execute).toThrow('수강 신청 시작 일자는 강의 시작 일자보다 늦을 수 없습니다.');
    });

    it('최대 수강 인원이 1명 이하인 경우, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 0,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = () => LectureScheduleDomain.create(dto);

      // Then
      expect(execute).toThrow('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    });
  });

  describe('수강 신청 가능 검증', () => {
    it('수강 가능 일자에 신청하면 검증 로직을 통과하는지 확인합니다.', () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const lectureSchedule = LectureScheduleDomain.create(dto);
      lectureSchedule.validateAppliable();
    });

    it('수강 가능 일자가 아닐 때 신청하는 경우, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const futureDate = new Date(Date.now() + 100000);
      const dto: CreateLectureScheduleDTO = {
        lectureId: 1,
        maxCapacity: 10,
        applicationStartAt: futureDate,
        startAt: futureDate,
        endAt: futureDate,
      };

      // When
      const lectureSchedule = LectureScheduleDomain.create(dto);
      const validate = () => lectureSchedule.validateAppliable();

      // Then
      expect(validate).toThrow('수강 신청 가능 일자가 아닙니다.');
    });
  });
});
