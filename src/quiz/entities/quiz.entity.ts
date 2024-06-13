import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  yes: number;

  @Column()
  no: number;

  @Column({ type: 'boolean', default: false })
  isClicked: boolean;
}
