import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ name: 'yes_counter', default: 0 })
  yesCounter: number;

  @Column({ name: 'no_counter', default: 0 })
  noCounter: number;
}
