import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';
import { CreateLectureScheduleRequest } from 'src/lecture/application/dto/request/create-lecture-schedule.request';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureApplicationResponse } from 'src/lecture/application/dto/response/lecture-application.response';
import { LectureApplicationsResponse } from 'src/lecture/application/dto/response/lecture-applications.response';
import { LectureScheduleResponse } from 'src/lecture/application/dto/response/lecture-schedule.response';
import { LectureSchedulesResponse } from 'src/lecture/application/dto/response/lecture-schedules.response';
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
  async apply(@Body() request: ApplyLectureRequest): Promise<boolean> {
    await this.lectureService.apply(request);

    return true;
  }

  @Get()
  async getLectureSchedules(): Promise<LectureScheduleResponse[]> {
    const lectureSchedules = await this.lectureService.getLectureSchedules();

    return LectureSchedulesResponse.from(lectureSchedules);
  }

  @Post(':lectureId/schedules')
  async createLectureSchedule(
    @Param('lectureId', ParseIntPipe) lectureId: number,
    @Body() request: CreateLectureScheduleRequest,
  ): Promise<LectureScheduleResponse> {
    const lectureSchedule = await this.lectureService.createLectureSchedule(request.toDTO(lectureId));

    return LectureScheduleResponse.from(lectureSchedule);
  }

  @Get('application/:userId')
  async getApplications(@Param('userId', ParseIntPipe) userId: number): Promise<LectureApplicationResponse[]> {
    const lectureApplications = await this.lectureService.getApplications(userId);

    return LectureApplicationsResponse.from(lectureApplications);
  }
}
