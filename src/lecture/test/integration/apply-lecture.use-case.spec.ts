import {
  ApplyLectureUseCase,
  applyLectureUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/apply-lecture.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { LectureModule } from 'src/lecture/lecture.module';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureCapacityEntity } from 'src/lecture/infrastructure/entity/lecture-capacity.entity';
import { LectureApplicationEntity } from 'src/lecture/infrastructure/entity/lecture-application.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { getPgTestTypeOrmModule } from 'src/database/utils/get-test-typeorm.module';
import { Repository } from 'typeorm';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { UserMapper } from 'src/user/domain/mapper/user.mapper';
import { UserDomain } from 'src/user/domain/model/user.domain';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureMapper } from 'src/lecture/domain/mapper/lecture.mapper';
import { LectureScheduleMapper } from 'src/lecture/domain/mapper/lecture-schedule.mapper';
import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';
import { Nullable } from 'src/common/type/native';

describe('ApplyLectureUseCase', () => {
  let module: TestingModule;
  let applyLectureUseCase: ApplyLectureUseCase;
  let userRepository: Repository<UserEntity>;
  let lectureRepository: Repository<LectureEntity>;
  let lectureScheduleRepository: Repository<LectureScheduleEntity>;
  let lectureCapacityRepository: Repository<LectureCapacityEntity>;
  let lectureApplicationRepository: Repository<LectureApplicationEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [getPgTestTypeOrmModule(), LectureModule],
    }).compile();

    applyLectureUseCase = module.get<ApplyLectureUseCase>(applyLectureUseCaseSymbol);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
    lectureRepository = module.get<Repository<LectureEntity>>(getRepositoryToken(LectureEntity));
    lectureScheduleRepository = module.get<Repository<LectureScheduleEntity>>(
      getRepositoryToken(LectureScheduleEntity),
    );
    lectureCapacityRepository = module.get<Repository<LectureCapacityEntity>>(
      getRepositoryToken(LectureCapacityEntity),
    );
    lectureApplicationRepository = module.get<Repository<LectureApplicationEntity>>(
      getRepositoryToken(LectureApplicationEntity),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 신청 성공 케이스', () => {
    it('특강 신청 성공 시, 정상적으로 남은 자리가 하나 줄어든다', async () => {
      // Given
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, new Date(), new Date(), new Date());
      const dto = new ApplyLectureRequest(user.id, lectureSchedule.id);

      // When
      await applyLectureUseCase.execute(dto);

      // Then
      const lectureCapacity = await lectureCapacityRepository.findOneByOrFail({
        lectureScheduleId: lectureSchedule.id,
      });
      expect(lectureCapacity.maxCapacity).toBe(10);
      expect(lectureCapacity.currentEnrollment).toBe(1);
    });

    it('특강 신청 성공 시, 정상적으로 신청 내역이 쌓인다.', async () => {
      // Given
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, new Date(), new Date(), new Date());
      const dto = new ApplyLectureRequest(user.id, lectureSchedule.id);

      // When
      await applyLectureUseCase.execute(dto);

      // Then
      const lectureApplication = await lectureApplicationRepository.findOneByOrFail({
        userId: user.id,
        lectureScheduleId: lectureSchedule.id,
      });
      expect(lectureApplication.userId).toBe(user.id);
      expect(lectureApplication.lectureId).toBe(lecture.id);
      expect(lectureApplication.lectureScheduleId).toBe(lectureSchedule.id);
    });
  });

  describe('특강 신청 실패 케이스', () => {
    it('특강 신청 시작 시간 전에 신청을 하면 실패한다.', async () => {
      // Given
      const tomorrowDate = new Date();
      tomorrowDate.setUTCDate(tomorrowDate.getUTCDate() + 1);
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, tomorrowDate, tomorrowDate, tomorrowDate);
      const dto = new ApplyLectureRequest(user.id, lectureSchedule.id);

      // When
      const execute = async () => await applyLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('수강 신청 가능 일자가 아닙니다.');
    });

    it('같은 특강에 재신청을 하면 실패한다.', async () => {
      // Given
      const user = await createUser('신청자');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 10, new Date(), new Date(), new Date());
      const dto = new ApplyLectureRequest(user.id, lectureSchedule.id);

      // When
      await applyLectureUseCase.execute(dto);
      const execute = async () => await applyLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('이미 수강 신청을 완료 했습니다.');
    });

    it('특강에 남은 자리가 없을 때, 신청을 하면 실패한다.', async () => {
      // Given
      const firstUser = await createUser('신청자1');
      const secondUser = await createUser('신청자2');
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 1, new Date(), new Date(), new Date());
      const firstUserDTO = new ApplyLectureRequest(firstUser.id, lectureSchedule.id);
      const secondUserDTO = new ApplyLectureRequest(secondUser.id, lectureSchedule.id);

      // When
      await applyLectureUseCase.execute(firstUserDTO);
      const execute = async () => await applyLectureUseCase.execute(secondUserDTO);

      // Then
      await expect(execute).rejects.toThrow('수강 신청의 최대 정원을 초과 했습니다.');
    });
  });

  describe('특강 신청 동시성 테스트', () => {
    it('3명이 정원인 특강에 3명이 신청하면 모두 성공해야한다.', async () => {
      // Given
      const users = await Promise.all([createUser('신청자1'), createUser('신청자2'), createUser('신청자3')]);
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 3, new Date(), new Date(), new Date());
      const dtos = users.map(user => new ApplyLectureRequest(user.id, lectureSchedule.id));

      // When
      await Promise.all(dtos.map(dto => applyLectureUseCase.execute(dto)));

      // Then
      const lectureCapacity = await lectureCapacityRepository.findOneByOrFail({
        lectureScheduleId: lectureSchedule.id,
      });
      expect(lectureCapacity.maxCapacity).toBe(3);
      expect(lectureCapacity.currentEnrollment).toBe(3);
    });

    it('5명이 정원인 특강에 6명이 신청하면 5명은 성공하고 1명은 실패해야 한다.', async () => {
      // Given
      const lecture = await createLecture('특강', '엄청난 특강');
      const lectureSchedule = await createLectureSchedule(lecture.id, 5, new Date(), new Date(), new Date());
      const users = await Promise.all(Array.from({ length: 6 }, (_, i) => createUser(`신청자${i + 1}`)));
      const dtos = users.map(user => new ApplyLectureRequest(user.id, lectureSchedule.id));

      // When
      const results = await Promise.allSettled(dtos.map(dto => applyLectureUseCase.execute(dto)));

      // Then
      const lectureCapacity = await lectureCapacityRepository.findOneByOrFail({
        lectureScheduleId: lectureSchedule.id,
      });
      expect(lectureCapacity.maxCapacity).toBe(5);
      expect(lectureCapacity.currentEnrollment).toBe(5);
      expect(results.filter(result => result.status === 'fulfilled').length).toBe(5);
      expect(results.filter(result => result.status === 'rejected').length).toBe(1);
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
});
