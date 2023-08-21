import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Board {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @ApiProperty({
        description: 'user id',
    })
    @Column()
    userId: number;

    @ApiProperty({
        description: 'contents',
    })
    @Column()
    contents: string;

    @ApiProperty({
        description: 'modified date',
    })
    @UpdateDateColumn()
    updateAt: Date;

    @ApiProperty({
        description: 'created date',
    })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({
        description: 'author',
    })
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}