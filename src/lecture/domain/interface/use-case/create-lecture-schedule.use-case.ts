import { CreateLectureScheduleDTO } from '../../dto/create-lecture-schedule.dto';
import { LectureScheduleDomain } from '../../model/lecture-schedule.domain';

export const createLectureScheduleUseCaseSymbol = Symbol.for('CreateLectureScheduleUseCase');

export interface CreateLectureScheduleUseCase {
  execute(dto: CreateLectureScheduleDTO): Promise<LectureScheduleDomain>;
}
