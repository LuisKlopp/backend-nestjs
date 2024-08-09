import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';

@Entity('question_random')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({
    type: 'enum',
    enum: ['love', 'primary', 'adult', 'none'],
    default: 'none',
  })
  category: 'love' | 'primary' | 'adult' | 'none';

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
