import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vote } from '../../vote/entities/vote.entity';

@Entity({ name: 'image_game' })
export class ImageGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_question' })
  question: string;

  @Column({ name: 'is_clicked', default: false })
  isClicked: boolean;

  @OneToMany(() => Vote, (vote) => vote.question)
  votes: Vote[];
}
