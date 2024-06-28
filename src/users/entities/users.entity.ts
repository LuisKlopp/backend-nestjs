import { Vote } from '../../vote/entities/vote.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nickname: string;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}
