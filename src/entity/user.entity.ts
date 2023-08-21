import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({
        description: 'user id',
        example: 'admin'
    })
    @Column({ unique: true })
    username: string;

    @ApiProperty({
        description: 'password',
        example: 'admin'
    })
    @Column({ select: false })
    password: string;

    @ApiProperty({
        description: 'user name',
        example: 'John'
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'writing boards',
    })
    @OneToMany(() => Board, (board) => board.user)
    boards: Board[];
}