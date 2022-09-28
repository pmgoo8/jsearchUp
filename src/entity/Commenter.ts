import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Boarden} from "./Boarden";
import {Enter} from "./Enter";

@Entity()
export class Commenter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    content: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToOne(type => Boarden, board => board.comments, {onDelete: 'CASCADE', onUpdate: "CASCADE"})
    board: Boarden;

    @ManyToOne(type => Enter, enter => enter.comments)
    enter: Enter;

    @Column()
    boardId: string
}