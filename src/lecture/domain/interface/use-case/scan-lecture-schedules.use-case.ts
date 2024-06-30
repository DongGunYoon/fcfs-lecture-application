import { LectureScheduleDomain } from '../../model/lecture-schedule.domain';

export const scanLectureSchedulesUseCaseSymbol = Symbol.for('ScanLectureSchedulesUseCase');

export interface ScanLectureSchedulesUseCase {
  execute(): Promise<LectureScheduleDomain[]>;
}
