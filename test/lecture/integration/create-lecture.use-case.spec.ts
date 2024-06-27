import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { getPgTestTypeOrmModule } from 'src/database/utils/get-test-typeorm.module';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { CreateLectureUseCaseImpl } from 'src/lecture/application/use-case/create-lecture.use-case.impl';
import { lectureRepositorySymbol } from 'src/lecture/domain/interface/repository/lecture.repository';
import { lectureServiceSymbol } from 'src/lecture/domain/interface/service/lecture.service';
import {
  CreateLectureUseCase,
  createLectureUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/create-lecture.use-case';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';
import { LectureServiceImpl } from 'src/lecture/domain/service/lecture.service.impl';
import { LectureEntity } from 'src/lecture/infrastructure/entity/lecture.entity';
import { LectureRepositoryImpl } from 'src/lecture/infrastructure/repository/lecture.repository.impl';
import { Repository } from 'typeorm';

describe('CreateLectureUseCase', () => {
  let module: TestingModule;
  let createLectureUseCase: CreateLectureUseCase;
  let lectureRepository: Repository<LectureEntity>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [getPgTestTypeOrmModule(), TypeOrmModule.forFeature([LectureEntity])],
      providers: [
        { provide: createLectureUseCaseSymbol, useClass: CreateLectureUseCaseImpl },
        { provide: lectureServiceSymbol, useClass: LectureServiceImpl },
        { provide: lectureRepositorySymbol, useClass: LectureRepositoryImpl },
      ],
    }).compile();

    createLectureUseCase = module.get<CreateLectureUseCase>(createLectureUseCaseSymbol);
    lectureRepository = module.get<Repository<LectureEntity>>(getRepositoryToken(LectureEntity));
  });

  afterAll(async () => {
    await module.close();
  });

  describe('특강 생성 성공 케이스', () => {
    it('특강이 정상적으로 생성되는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('특강', '엄청난 특강');

      // When
      const lecture = await createLectureUseCase.execute(dto);

      // Then
      const createdLecture = await lectureRepository.findOneByOrFail({ id: lecture.id });
      expect(lecture).toBeInstanceOf(LectureDomain);
      expect(lecture.name).toBe(createdLecture.name);
      expect(lecture.description).toBe(createdLecture.description);
    });

    it('특강의 설명이 없어도 정상적으로 생성되는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('특강', null);

      // When
      const lecture = await createLectureUseCase.execute(dto);

      // Then
      const createdLecture = await lectureRepository.findOneByOrFail({ id: lecture.id });
      expect(lecture).toBeInstanceOf(LectureDomain);
      expect(lecture.name).toBe(createdLecture.name);
      expect(lecture.description).toBe(createdLecture.description);
    });
  });

  describe('특강 생성 실패 케이스', () => {
    it('특강의 이름이 빈 string인 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('', '엄청난 특강');

      // When
      const execute = async () => await createLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('이름은 최소 1글자 이상이어야 합니다.');
    });

    it('특강의 이름이 공백으로만 구성된 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('  ', '엄청난 특강');

      // When
      const execute = async () => await createLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('이름은 최소 1글자 이상이어야 합니다.');
    });

    it('특강의 이름이 최대 길이를 초과한 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('a'.repeat(1000), '엄청난 특강');

      // When
      const execute = async () => await createLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('이름이 최대 길이를 초과했습니다.');
    });

    it('특강의 설명이 최대 길이를 초과한 경우, 에러가 발생하는지 확인합니다.', async () => {
      // Given
      const dto = new CreateLectureRequest('특강', 'a'.repeat(10000));

      // When
      const execute = async () => await createLectureUseCase.execute(dto);

      // Then
      await expect(execute).rejects.toThrow('설명이 최대 길이를 초과했습니다.');
    });
  });
});
