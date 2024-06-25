import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('lecture_applications')
@Unique('lecture_application_user_lecture_schedule', ['userId', 'lectureScheduleId'])
export class LectureApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'lecture_schedule_id' })
  lectureScheduleId: number;

  @CreateDateColumn({ name: 'applied_at', type: 'timestamptz' })
  appliedAt: Date;
}
