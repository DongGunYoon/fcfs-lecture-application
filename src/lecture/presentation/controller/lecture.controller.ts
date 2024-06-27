import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApplyLectureRequest } from 'src/lecture/application/dto/request/apply-lecture.request';
import { CreateLectureScheduleRequest } from 'src/lecture/application/dto/request/create-lecture-schedule.request';
import { CreateLectureRequest } from 'src/lecture/application/dto/request/create-lecture.request';
import { LectureApplicationResponse } from 'src/lecture/application/dto/response/lecture-application.response';
import { LectureApplicationsResponse } from 'src/lecture/application/dto/response/lecture-applications.response';
import { LectureScheduleResponse } from 'src/lecture/application/dto/response/lecture-schedule.response';
import { LectureSchedulesResponse } from 'src/lecture/application/dto/response/lecture-schedules.response';
import { LectureResponse } from 'src/lecture/application/dto/response/lecture.response';
import {
  ApplyLectureUseCase,
  applyLectureUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/apply-lecture.use-case';
import {
  CreateLectureScheduleUseCase,
  createLectureScheduleUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/create-lecture-schedule.use-case';
import {
  CreateLectureUseCase,
  createLectureUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/create-lecture.use-case';
import {
  ReadLectureApplicationsUseCase,
  readLectureApplicationsUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/read-lecture-applications.use-case';
import {
  ScanLectureSchedulesUseCase,
  scanLectureSchedulesUseCaseSymbol,
} from 'src/lecture/domain/interface/use-case/scan-lecture-schedules.use-case';

@Controller('lectures')
export class LectureController {
  constructor(
    @Inject(createLectureUseCaseSymbol)
    private readonly createLectureUseCase: CreateLectureUseCase,
    @Inject(applyLectureUseCaseSymbol)
    private readonly applyLectureUseCase: ApplyLectureUseCase,
    @Inject(createLectureScheduleUseCaseSymbol)
    private readonly createLectureScheduleUseCase: CreateLectureScheduleUseCase,
    @Inject(readLectureApplicationsUseCaseSymbol)
    private readonly readLectureApplicationsUseCase: ReadLectureApplicationsUseCase,
    @Inject(scanLectureSchedulesUseCaseSymbol)
    private readonly scanLectureSchedulesUseCase: ScanLectureSchedulesUseCase,
  ) {}

  @Post()
  async create(@Body() request: CreateLectureRequest): Promise<LectureResponse> {
    const lecture = await this.createLectureUseCase.execute(request);

    return LectureResponse.from(lecture);
  }

  @Post('apply')
  async apply(@Body() request: ApplyLectureRequest): Promise<boolean> {
    await this.applyLectureUseCase.execute(request);

    return true;
  }

  @Get()
  async scanSchedules(): Promise<LectureScheduleResponse[]> {
    const lectureSchedules = await this.scanLectureSchedulesUseCase.execute();

    return LectureSchedulesResponse.from(lectureSchedules);
  }

  @Post(':lectureId/schedules')
  async createSchedule(
    @Param('lectureId', ParseIntPipe) lectureId: number,
    @Body() request: CreateLectureScheduleRequest,
  ): Promise<LectureScheduleResponse> {
    const lectureSchedule = await this.createLectureScheduleUseCase.execute(request.toDTO(lectureId));

    return LectureScheduleResponse.from(lectureSchedule);
  }

  @Get('application/:userId')
  async getApplications(@Param('userId', ParseIntPipe) userId: number): Promise<LectureApplicationResponse[]> {
    const lectureApplications = await this.readLectureApplicationsUseCase.execute(userId);

    return LectureApplicationsResponse.from(lectureApplications);
  }
}
