import { IsOptional, IsString } from 'class-validator';
import { Nullable } from 'src/common/type/native';
import { CreateLectureDTO } from 'src/lecture/domain/dto/create-lecture.dto';

export class CreateLectureRequest {
  constructor(name: string, description: Nullable<string>) {
    this.name = name;
    this.description = description;
  }

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: Nullable<string>;

  toDTO(): CreateLectureDTO {
    return {
      name: this.name,
      description: this.description,
    };
  }
}
