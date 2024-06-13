import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({ type: 'boolean', default: false })
  isClicked: boolean;
}
