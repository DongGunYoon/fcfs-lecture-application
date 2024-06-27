import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Nullable } from 'src/common/type/native';
import { getPgTestTypeOrmModule } from 'src/database/utils/get-test-typeorm.module';
import { CreateLectureScheduleUseCaseImpl } from 'src/lecture/application/use-case/create-lecture-schedule.use-case.impl';
import { CreateLectureScheduleDTO } from 'src/lecture/domain/dto/create-lecture-schedule.dto';
import { lectureScheduleRepositorySymbol } from 'src/lecture/domain/interface/repository/lecture-schedule.repository';
import { lectureRepositorySymbol } from 'src/lecture/domain/interface/repository/lecture.repository';
import { lectureScheduleServiceSymbol } from 'src/lecture/domain/interface/service/lecture-schedule.service';
import { lectureServiceSymbol } from 'src/lecture/domain/interface/service/lecture.service';
import {
  CreateLectureScheduleUseCase,
  createLectureScheduleUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/create-lecture-schedule.use-case';
import { LectureMapper } from 'src/lecture/domain/mapper/lecture.mapper';
import { LectureScheduleDomain } from 'src/lecture/domain/model/lecture-schedule.domain';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureScheduleServiceImpl } from 'src/lecture/domain/service/lecture-schedule.service.impl';
import { LectureServiceImpl } from 'src/lecture/domain/service/lecture.service.impl';
import { LectureScheduleEntity } from 'src/lecture/infrastructure/entity/lecture-schedule.entity';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureScheduleRepositoryImpl } from 'src/lecture/infrastructure/repository/lecture-schedule.repository.impl';
import { LectureRepositoryImpl } from 'src/lecture/infrastructure/repository/lecture.repository.impl';
import { Repository } from 'typeorm';

describe('CreateLectureScheduleUseCase', () => {
  let module: TestingModule;
  let createLectureScheduleUseCase: CreateLectureScheduleUseCase;
  let lectureRepository: Repository<LectureEntity>;
  let lectureScheduleRepository: Repository<LectureScheduleEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [getPgTestTypeOrmModule(), TypeOrmModule.forFeature([LectureEntity, LectureScheduleEntity])],
      providers: [
        { provide: createLectureScheduleUseCaseSymbol, useClass: CreateLectureScheduleUseCaseImpl },
        { provide: lectureServiceSymbol, useClass: LectureServiceImpl },
        { provide: lectureScheduleServiceSymbol, useClass: LectureScheduleServiceImpl },
        { provide: lectureRepositorySymbol, useClass: LectureRepositoryImpl },
        { provide: lectureScheduleRepositorySymbol, useClass: LectureScheduleRepositoryImpl },
      ],
    }).compile();

    createLectureScheduleUseCase = module.get<CreateLectureScheduleUseCase>(createLectureScheduleUseCaseSymbol);
    lectureRepository = module.get<Repository<LectureEntity>>(getRepositoryToken(LectureEntity));
    lectureScheduleRepository = module.get<Repository<LectureScheduleEntity>>(
      getRepositoryToken(LectureScheduleEntity),
    );
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 스케쥴 생성 성공 케이스', () => {
    it('특강이 정상적으로 생성되는지 확인합니다.', async () => {
      // Given
      const lecture = await createLecture('특강', null);
      const dto: CreateLectureScheduleDTO = {
        lectureId: lecture.id,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const lectureSchedule = await createLectureScheduleUseCase.execute(dto);

      // Then
      const createdLectureSchedule = await lectureScheduleRepository.findOneByOrFail({ id: lectureSchedule.id });
      expect(lectureSchedule).toBeInstanceOf(LectureScheduleDomain);
      expect(lectureSchedule.applicationStartAt).toEqual(createdLectureSchedule.applicationStartAt);
      expect(lectureSchedule.startAt).toEqual(createdLectureSchedule.startAt);
      expect(lectureSchedule.endAt).toEqual(createdLectureSchedule.endAt);
    });
  });

  describe('특강 스케쥴 생성 실패 케이스', () => {
    it('주어진 특강이 존재하지 않는 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const dto: CreateLectureScheduleDTO = {
        lectureId: -10,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = async () => await createLectureScheduleUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('강의가 존재하지 않습니다.');
    });

    it('강의 시작 시간이 종료 시간보다 늦은 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const lecture = await createLecture('특강', null);
      const dto: CreateLectureScheduleDTO = {
        lectureId: lecture.id,
        maxCapacity: 10,
        applicationStartAt: new Date(),
        startAt: new Date(Date.now() + 10000),
        endAt: new Date(),
      };

      // When
      const execute = async () => await createLectureScheduleUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('강의 시작 시간이 강의 종료 시간보다 늦을 수 없습니다.');
    });

    it('수강 신청 시작 시간이 강의 시작 시간보다 늦은 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const lecture = await createLecture('특강', null);
      const dto: CreateLectureScheduleDTO = {
        lectureId: lecture.id,
        maxCapacity: 10,
        applicationStartAt: new Date(Date.now() + 1000),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = async () => await createLectureScheduleUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('수강 신청 시작 일자는 강의 시작 일자보다 늦을 수 없습니다.');
    });

    it('최대 수강 인원이 1명 이하인 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const lecture = await createLecture('특강', null);
      const dto: CreateLectureScheduleDTO = {
        lectureId: lecture.id,
        maxCapacity: 0,
        applicationStartAt: new Date(),
        startAt: new Date(),
        endAt: new Date(),
      };

      // When
      const execute = async () => await createLectureScheduleUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('수강 신청의 정원은 최소 1명 이상이어야 합니다.');
    });
  });

  const createLecture = async (name: string, description: Nullable<string>): Promise<LectureDomain> => {
    const lecture = LectureDomain.create({ name, description });

    return LectureMapper.toDomain(await lectureRepository.save(lecture));
  };
});
