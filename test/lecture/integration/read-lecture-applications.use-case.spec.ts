import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Nullable } from 'src/common/type/native';
import { getPgTestTypeOrmModule } from 'src/database/utils/get-test-typeorm.module';
import {
  ReadLectureApplicationsUseCase,
  readLectureApplicationsUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/read-lecture-applications.use-case';
import { LectureApplicationMapper } from 'src/lecture/domain/mapper/lecture-application.mapper';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';
import { LectureMapper } from 'src/lecture/domain/mapper/lecture.mapper';
import { LectureApplicationDomain } from 'src/lecture/domain/model/lecture-application.domain';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureApplicationEntity } from 'src/lecture/infrastructure/entity/lecture-application.entity';
import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureModule } from 'src/lecture/lecture.module';
import { UserMapper } from 'src/user/domain/mapper/user.mapper';
import { UserDomain } from 'src/user/domain/model/user.domain';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { Repository } from 'typeorm';

describe('ReadLectureApplicationsUseCase', () => {
  let module: TestingModule;
  let readLectureApplicationsUseCase: ReadLectureApplicationsUseCase;
  let userRepository: Repository<UserEntity>;
  let lectureRepository: Repository<LectureEntity>;
  let lectureScheduleRepository: Repository<LectureScheduleEntity>;
  let lectureApplicationRepository: Repository<LectureApplicationEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [getPgTestTypeOrmModule(), LectureModule],
    }).compile();

    readLectureApplicationsUseCase = module.get<ReadLectureApplicationsUseCase>(readLectureApplicationsUseCaseSymbol);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    lectureRepository = module.get<Repository<LectureEntity>>(getRepositoryToken(LectureEntity));
    lectureScheduleRepository = module.get<Repository<LectureScheduleEntity>>(
      getRepositoryToken(LectureScheduleEntity),
    );
    lectureApplicationRepository = module.get<Repository<LectureApplicationEntity>>(
      getRepositoryToken(LectureApplicationEntity),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 신청 목록 조회', () => {
    it('신청한 특강이 없다면 빈 배열이 반환된다.', async () => {
      // Given
      const user = await createUser('신청자');

      // When
      const result = await readLectureApplicationsUseCase.execute(user.id);

      // Then
      expect(result).toHaveLength(0);
    });

    it('신청한 특강이 하나 있다면 해당 특강 내역이 배열로 반환된다.', async () => {
      // Given
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, new Date(), new Date(), new Date());
      await createLectureApplication(user.id, lecture.id, lectureSchedule.id);

      // When
      const result = await readLectureApplicationsUseCase.execute(user.id);

      // Then
      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe(user.id);
      expect(result[0].lectureId).toBe(lecture.id);
      expect(result[0].lectureScheduleId).toBe(lectureSchedule.id);
    });

    it('신청한 특강이 여러 개면 모든 특강 내역이 배열로 반환된다.', async () => {
      // Given
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedules = await Promise.all(
        Array.from({ length: 5 }, () => createLectureSchedule(lecture.id, 3, new Date(), new Date(), new Date())),
      );
      await Promise.all(
        Array.from({ length: 5 }, (_, i) => createLectureApplication(user.id, lecture.id, lectureSchedules[i].id)),
      );

      // When
      const result = await readLectureApplicationsUseCase.execute(user.id);

      // Then
      expect(result).toHaveLength(5);
    });
  });

  const createUser = async (name: string): Promise<UserDomain> => {
    const user = UserDomain.create(name);

    return UserMapper.toDomain(await userRepository.save(user));
  };

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

  const createLectureApplication = async (userId: number, lectureId: number, lectureScheduleId: number) => {
    const lectureApplication = LectureApplicationDomain.create({ userId, lectureId, lectureScheduleId });

    return LectureApplicationMapper.toDomain(await lectureApplicationRepository.save(lectureApplication));
  };
});
