export type CreateLectureScheduleDTO = {
  lectureId: number;
  maxCapacity: number;
  applicationStartAt: Date;
  startAt: Date;
  endAt: Date;
};
