
import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";


export abstract class BaseEntity {

    @ApiProperty({
        example: '1abssdf',
        description: '사용자 아이디'
    })
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
    
}