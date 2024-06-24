import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureDomain } from '../model/lecture.domain';
import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';
import { LectureApplicationDomain } from '../model/lecture-application.domain';

export const lectureServiceSymbol = Symbol.for('LectureService');

export interface LectureService {
  create(request: CreateLectureRequest): Promise<LectureDomain>;
  apply(request: ApplyLectureRequest): Promise<LectureApplicationDomain>;
}