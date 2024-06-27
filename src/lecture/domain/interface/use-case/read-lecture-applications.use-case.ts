import { LectureApplicationDomain } from '../../model/lecture-application.domain';

export const readLectureApplicationsUseCaseSymbol = Symbol.for('ReadLectureApplicationsUseCase');

export interface ReadLectureApplicationsUseCase {
  execute(userId: number): Promise<LectureApplicationDomain[]>;
}
