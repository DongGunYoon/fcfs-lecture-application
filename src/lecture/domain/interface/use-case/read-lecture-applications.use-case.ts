import { LectureApplicationResponse } from 'src/lecture/application/dto/response/lecture-application.response';

export const readLectureApplicationsUseCaseSymbol = Symbol.for('ReadLectureApplicationsUseCase');

export interface ReadLectureApplicationsUseCase {
  execute(userId: number): Promise<LectureApplicationResponse[]>;
}
