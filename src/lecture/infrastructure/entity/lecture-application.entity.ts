import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('lecture_applications')
@Unique('lecture_application_user_lecture', ['userId', 'lectureId'])
export class LectureApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'lecture_id' })
  lectureId: number;

  @CreateDateColumn({ name: 'applied_at', type: 'timestamptz' })
  appliedAt: Date;
}
