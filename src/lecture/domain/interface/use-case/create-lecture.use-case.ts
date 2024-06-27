import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureDomain } from '../../model/lecture.domain';

export const createLectureUseCaseSymbol = Symbol.for('CreateLectureUseCase');

export interface CreateLectureUseCase {
  execute(dto: CreateLectureRequest): Promise<LectureDomain>;
}
