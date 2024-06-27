import { LectureCapacityDomain } from 'src/lecture/domain/model/lecture-capacity.domain';

describe('LectureCapacityDomain', () => {
  describe('강의 정원 관리 생성', () => {
    it('강의 정원 관리가 생성되는지 확인합니다', () => {
      // Given
      const lectureId = 1;
      const maxCapacity = 10;

      // When
      const lectureCapacity = LectureCapacityDomain.create(lectureId, maxCapacity);

      // Then
      expect(lectureCapacity).toBeInstanceOf(LectureCapacityDomain);
      expect(lectureCapacity.lectureId).toBe(lectureId);
      expect(lectureCapacity.maxCapacity).toBe(maxCapacity);
    });

    it('수강 신청 정원이 1보다 작을 시, 에러가 발생하는지 확인합니다.', () => {
      // Given
      const lectureId = 1;
      const maxCapacity = 0;

      // When
      const execute = () => LectureCapacityDomain.create(lectureId, maxCapacity);

      // Then
      expect(execute).toThrow('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    });
  });

  describe('수강 신청', () => {
    it('수강 신청이 가능한 경우, 현재 수강 신청자 수가 1 증가하는지 확인합니다.', () => {
      // Given
      const lectureId = 1;
      const maxCapacity = 10;

      // When
      const lectureCapacity = LectureCapacityDomain.create(lectureId, maxCapacity);
      lectureCapacity.enroll();

      // Then
      expect(lectureCapacity).toBeInstanceOf(LectureCapacityDomain);
      expect(lectureCapacity.currentEnrollment).toBe(1);
    });

    it('수강 신청 정원이 가득찬 경우, 에러가 발생하는지 확인합니다.', () => {
      const lectureId = 1;
      const maxCapacity = 1;

      // When
      const lectureCapacity = LectureCapacityDomain.create(lectureId, maxCapacity);
      lectureCapacity.currentEnrollment = maxCapacity;
      const enroll = () => lectureCapacity.enroll();

      // Then
      expect(enroll).toThrow('수강 신청의 최대 정원을 초과 했습니다.');
    });
  });
});
