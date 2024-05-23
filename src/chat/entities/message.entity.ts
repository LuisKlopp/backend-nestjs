import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  room_id: string;

  @Column()
  sender_id: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
