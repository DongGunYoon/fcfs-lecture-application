import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LectureEntity } from './lecture.entity';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';

@Entity('lecture_applications')
@Unique('lecture_application_user_lecture_schedule', ['userId', 'lectureScheduleId'])
export class LectureApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'lecture_id' })
  lectureId: number;

  @Column({ name: 'lecture_schedule_id' })
  lectureScheduleId: number;

  @CreateDateColumn({ name: 'applied_at', type: 'timestamptz' })
  appliedAt: Date;

  @ManyToOne(() => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => LectureEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'lecture_id' })
  lecture!: LectureEntity;
}
