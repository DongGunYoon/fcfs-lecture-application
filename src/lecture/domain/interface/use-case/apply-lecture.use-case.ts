import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';

export const applyLectureUseCaseSymbol = Symbol.for('ApplyLectureUseCase');

export interface ApplyLectureUseCase {
  execute(dto: ApplyLectureRequest): Promise<void>;
}
