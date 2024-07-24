import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HistoryUserAnswer } from './history-user-answer.entity';
import { Vote } from 'src/vote/entities/vote.entity';

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

  @Column({
    name: 'check_image_path',
    type: 'tinyint',
    width: 1,
    default: () => '0',
  })
  checkImagePath: number;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => HistoryUserAnswer, (answer) => answer.user)
  answers: HistoryUserAnswer[];
}
