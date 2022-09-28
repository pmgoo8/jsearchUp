import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Enter} from "./Enter";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 20})
    name: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: "user_role",
        joinColumn: {name: "role_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "user_id", referencedColumnName: "id"}
    })
    users: User[];

    @ManyToMany(() => Enter, enter => enter.roles)
    @JoinTable({
        name: "enter_role",
        joinColumn: {name: "role_id", referencedColumnName: "id"},
        inverseJoinColumn: {name: "enter_id", referencedColumnName: "id"}
    })
    enters: Enter[];
}