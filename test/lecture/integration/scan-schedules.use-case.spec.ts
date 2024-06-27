import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Nullable } from 'src/common/type/native';
import { getPgTestTypeOrmModule } from 'src/database/utils/get-test-typeorm.module';
import {
  ScanLectureSchedulesUseCase,
  scanLectureSchedulesUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/scan-lecture-schedules.use-case';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';
import { LectureMapper } from 'src/lecture/domain/mapper/lecture.mapper';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureModule } from 'src/lecture/lecture.module';
import { Repository } from 'typeorm';

describe('ScanLectureSchedulesUseCase', () => {
  let module: TestingModule;
  let scanLectureSchedulesUseCase: ScanLectureSchedulesUseCase;
  let lectureRepository: Repository<LectureEntity>;
  let lectureScheduleRepository: Repository<LectureScheduleEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [getPgTestTypeOrmModule(), LectureModule],
    }).compile();

    scanLectureSchedulesUseCase = module.get<ScanLectureSchedulesUseCase>(scanLectureSchedulesUseCaseSymbol);
    lectureRepository = module.get<Repository<LectureEntity>>(getRepositoryToken(LectureEntity));
    lectureScheduleRepository = module.get<Repository<LectureScheduleEntity>>(
      getRepositoryToken(LectureScheduleEntity),
    );
  });

  beforeEach(async () => {
    await lectureScheduleRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 스케쥴 목록 조회', () => {
    it('생성된 특강 스케쥴이 없다면 빈 배열이 반환된다.', async () => {
      // When
      const result = await scanLectureSchedulesUseCase.execute();

      // Then
      expect(result).toHaveLength(0);
    });

    it('신청한 특강이 하나 있다면 해당 특강 내역이 배열로 반환된다.', async () => {
      // Given
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, new Date(), new Date(), new Date());

      // When
      const result = await scanLectureSchedulesUseCase.execute();

      // Then
      expect(result).toHaveLength(1);
      expect(result[0].lectureId).toBe(lecture.id);
      expect(result[0].id).toBe(lectureSchedule.id);
      expect(result[0].applicationStartAt).toEqual(lectureSchedule.applicationStartAt);
    });

    it('신청한 특강이 여러 개면 모든 특강 내역이 배열로 반환된다.', async () => {
      // Given
      const lecture = await createLecture('특강', '엄청난 특강');
      await Promise.all(
        Array.from({ length: 5 }, () => createLectureSchedule(lecture.id, 3, new Date(), new Date(), new Date())),
      );

      // When
      const result = await scanLectureSchedulesUseCase.execute();

      // Then
      expect(result).toHaveLength(5);
    });
  });

  const createLecture = async (name: string, description: Nullable<string>): Promise<LectureDomain> => {
    const lecture = LectureDomain.create({ name, description });

    return LectureMapper.toDomain(await lectureRepository.save(lecture));
  };

  const createLectureSchedule = async (
    lectureId: number,
    maxCapacity: number,
    applicationStartAt: Date,
    startAt: Date,
    endAt: Date,
  ) => {
    const lectureSchedule = LectureScheduleDomain.create({
      lectureId,
      maxCapacity,
      applicationStartAt,
      startAt,
      endAt,
    });

    return LectureScheduleMapper.toDomain(await lectureScheduleRepository.save(lectureSchedule));
  };
});
