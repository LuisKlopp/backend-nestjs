import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HistoryUser } from 'src/history-user/entities/history-user.entity';
import { ImageGame } from '../../image-game/entities/image-game.entity';

@Entity({ name: 'votes' })
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HistoryUser, (user) => user.votes)
  @JoinColumn({ name: 'user_id' })
  user: HistoryUser;

  @ManyToOne(() => ImageGame, (question) => question.votes)
  @JoinColumn({ name: 'question_id' })
  question: ImageGame;

  @Column()
  votes: number;
}
