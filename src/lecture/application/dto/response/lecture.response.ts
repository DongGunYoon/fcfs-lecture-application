import { Nullable } from 'src/common/type/native';
import { LectureDomain } from 'src/lecture/domain/model/lecture.domain';

export class LectureResponse {
  id: number;
  name: string;
  description: Nullable<string>;
  createdAt: Date;

  static from(lecture: LectureDomain): LectureResponse {
    return {
      id: lecture.id,
      name: lecture.name,
      description: lecture.description,
      createdAt: lecture.createdAt,
    };
  }
}
