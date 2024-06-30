import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LectureScheduleEntity } from './lecture-schedule.entity';
import { LectureEntity } from './lecture.entity';

@Entity('lecture_capacities')
export class LectureCapacityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'lecture_id' })
  lectureId: number;

  @Column({ name: 'lecture_schedule_id' })
  lectureScheduleId: number;

  @Column({ name: 'max_capacity' })
  maxCapacity: number;

  @Column({ name: 'current_enrollment', default: 0 })
  currentEnrollment: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => LectureEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'lecture_id' })
  lecture!: LectureEntity;

  @OneToOne(() => LectureScheduleEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'lecture_schedule_id' })
  lectureSchedule: LectureScheduleEntity;
}
