import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { ImageGame } from '../../image-game/entities/image-game.entity';

@Entity({ name: 'votes' })
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ImageGame, (question) => question.votes)
  @JoinColumn({ name: 'question_id' })
  question: ImageGame;

  @Column()
  votes: number;
}
