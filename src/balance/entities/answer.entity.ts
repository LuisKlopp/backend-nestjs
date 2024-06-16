import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balanceId: number;

  @Column()
  choice: string;
}
