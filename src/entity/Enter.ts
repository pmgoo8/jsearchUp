import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {Role} from "./Role";
import {Boarden} from "./Boarden";
import {Commenter} from "./Commenter";

@Entity()
@Unique(['entID'])
export class Enter {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({length: 255})
    entID: string;

    @Column({length: 255})
    password: string;

    @Column({length: 255})
    entname: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => Role, role => role.enters)
    @JoinTable({
        name: "enter_role",
        joinColumn: {name: "enter_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "role_id", referencedColumnName: "id"}
    })
    roles: Role[];

    @OneToMany(type => Boarden, board => board.enter)
    boards: Boarden[];

    @OneToMany(type => Commenter, comment => comment.enter)
    comments: Commenter[];
}