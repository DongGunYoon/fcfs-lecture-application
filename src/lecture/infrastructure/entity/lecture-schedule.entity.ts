import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LectureCapacityEntity } from './lecture-capacity.entity';
import { LectureEntity } from './lecture.entity';

@Entity('lecture_schedules')
export class LectureScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lecture_id' })
  lectureId: number;

  @Column({ name: 'application_start_at', type: 'timestamptz' })
  applicationStartAt: Date;

  @Column({ name: 'start_at', type: 'timestamptz' })
  startAt: Date;

  @Column({ name: 'end_at', type: 'timestamptz' })
  endAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => LectureEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'lecture_id' })
  lecture!: LectureEntity;

  @OneToOne(() => LectureCapacityEntity, lectureCapacity => lectureCapacity.lectureSchedule, { cascade: true })
  lectureCapacity!: LectureCapacityEntity;
}
