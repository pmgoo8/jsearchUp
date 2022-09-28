import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {Commenter} from './Commenter';
import {Enter} from "./Enter";

@Entity()
export class Boarden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(type => Commenter, commenter => commenter.board)
  comments: Commenter[];

  @ManyToOne(type => Enter, enter => enter.boards)
  enter: Enter;

  @Column()
  enterId: number;

}