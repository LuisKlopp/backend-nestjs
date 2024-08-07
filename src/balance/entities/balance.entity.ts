import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('balance_random')
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ name: 'left_answer' })
  leftAnswer: string;

  @Column({ name: 'right_answer' })
  rightAnswer: string;

  @Column({ name: 'left_count' })
  leftCount: number;

  @Column({ name: 'right_count' })
  rightCount: number;

  @Column({
    type: 'enum',
    enum: ['love', 'primary', 'adult', 'none'],
    default: 'none',
  })
  category: 'love' | 'primary' | 'adult' | 'none';
}
