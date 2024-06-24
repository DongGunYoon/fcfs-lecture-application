import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureApplicationResponse } from 'src/lecture/application/dto/response/lecture-application.response';
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

  @Post('apply')
  async apply(@Body() request: ApplyLectureRequest): Promise<LectureApplicationResponse> {
    const lectureApplication = await this.lectureService.apply(request);

    return LectureApplicationResponse.from(lectureApplication);
  }
}