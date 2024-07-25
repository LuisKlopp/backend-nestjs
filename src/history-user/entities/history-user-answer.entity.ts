import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HistoryUser } from './history-user.entity';

@Entity({ name: 'history_user_answer' })
export class HistoryUserAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  message: string;

  @ManyToOne(() => HistoryUser, (user) => user.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: HistoryUser;
}
