import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TodoStatusEnum } from './ToDoModel';

@Entity('Todo')
export class ToDoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50, unique: true })
  Name: string;
  @Column()
  Desc: string;
  @CreateDateColumn({
    update: false,
  })
  CreatedAt: Date;
  @UpdateDateColumn()
  UpdatedAt: Date;
  @DeleteDateColumn()
  DeleatedAt: Date;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
}
