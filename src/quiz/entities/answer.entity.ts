import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quizId: number;

  @Column()
  choice: string;
}
