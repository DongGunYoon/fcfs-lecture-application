import { CreateLectureScheduleDTO } from '../../dto/create-lecture-schedule.dto';
import { LectureScheduleDomain } from '../../model/lecture-schedule.domain';

export const lectureScheduleServiceSymbol = Symbol.for('LectureScheduleService');

export interface LectureScheduleService {
  create(dto: CreateLectureScheduleDTO): Promise<LectureScheduleDomain>;
  getAll(): Promise<LectureScheduleDomain[]>;
  validateAppliable(id: number): Promise<void>;
}
