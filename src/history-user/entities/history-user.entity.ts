import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistoryUserAnswer } from './history-user-answer.entity';

@Entity({ name: 'history_user' })
export class HistoryUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  gender: string;

  @Column({ name: 'generate_string' })
  generateString: string;

  @Column({ name: 'visit_count' })
  visitCount: string;

  @OneToMany(() => HistoryUserAnswer, (answer) => answer.user)
  answers: HistoryUserAnswer[];
}
