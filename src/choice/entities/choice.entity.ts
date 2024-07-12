import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ name: 'yes_count', default: 0 })
  yesCount: number;

  @Column({ name: 'no_count', default: 0 })
  noCount: number;

  @Column({
    type: 'enum',
    enum: ['love', 'primary', 'adult', 'none'],
    default: 'none',
  })
  category: 'love' | 'primary' | 'adult' | 'none';
}
