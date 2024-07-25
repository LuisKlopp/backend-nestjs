import { Vote } from '../../vote/entities/vote.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HistoryUserAnswer } from 'src/history-user/entities/history-user-answer.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 10 })
  gender: string;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => HistoryUserAnswer, (answer) => answer.user)
  answers: HistoryUserAnswer[];
}
