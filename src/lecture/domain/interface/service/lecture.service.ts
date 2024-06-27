import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureDomain } from '../../model/lecture.domain';

export const lectureServiceSymbol = Symbol.for('LectureService');

export interface LectureService {
  create(request: CreateLectureRequest): Promise<LectureDomain>;
  getByIdOrThrow(id: number): Promise<LectureDomain>;
}
