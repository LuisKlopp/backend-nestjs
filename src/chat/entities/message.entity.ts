import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: string; // 새로운 컬럼 추가

  @Column()
  sender_id: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
