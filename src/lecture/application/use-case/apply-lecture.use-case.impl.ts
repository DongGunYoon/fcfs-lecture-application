import { Inject } from '@nestjs/common';
import { ApplyLectureRequest } from '../dto/request/apply-lecture.request';
import { ApplyLectureUseCase } from './../../domain/interface/use-case/apply-lecture.use-case';
import { UserService, userServiceSymbol } from 'src/user/domain/interface/service/user.service';
import { DataSource } from 'typeorm';
import {
  LectureCapacityService,
  lectureCapacityServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-capacity.service';
import {
  LectureApplicationService,
  lectureApplicationServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-application.service';
import {
  LectureScheduleService,
  lectureScheduleServiceSymbol,
} from 'src/lecture/domain/interface/service/lecture-schedule.service';

export class ApplyLectureUseCaseImpl implements ApplyLectureUseCase {
  constructor(
    @Inject(lectureScheduleServiceSymbol) private readonly lectureScheduleService: LectureScheduleService,
    @Inject(lectureCapacityServiceSymbol) private readonly lectureCapacityService: LectureCapacityService,
    @Inject(lectureApplicationServiceSymbol) private readonly lectureApplicationService: LectureApplicationService,
    @Inject(userServiceSymbol) private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: ApplyLectureRequest): Promise<void> {
    await this.userService.getOrThrow(dto.userId);
    const lectureSchedule = await this.lectureScheduleService.validateAppliable(dto.lectureScheduleId);

    await this.dataSource.transaction(async transactionManager => {
      await this.lectureCapacityService.enroll(dto.lectureScheduleId, transactionManager);
      await this.lectureApplicationService.create(
        dto.toCreateLectureApplicationDTO(lectureSchedule.lectureId),
        transactionManager,
      );
    });
  }
}
