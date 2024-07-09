import { Vote } from '../../vote/entities/vote.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserAnswer } from '../../user-answer/entities/user-answer.entity';

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

  @OneToMany(() => UserAnswer, (answer) => answer.user)
  answers: UserAnswer[];
}
