import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureResponse } from 'src/lecture/application/dto/response/lecture.response';
import { LectureService, lectureServiceSymbol } from 'src/lecture/domain/interface/lecture.service';

@Controller('lectures')
export class LectureController {
  constructor(@Inject(lectureServiceSymbol) private readonly lectureService: LectureService) {}

  @Post()
  async create(@Body() request: CreateLectureRequest): Promise<LectureResponse> {
    const lecture = await this.lectureService.create(request);

    return LectureResponse.from(lecture);
  }
}
