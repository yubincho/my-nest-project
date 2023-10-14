
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from "../../base-entity/base.entity";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";



@Entity({ schema: 'cat', name: 'cats' })
export class Cat extends BaseEntity {

    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    @IsString()
    @Column({ nullable: false })
    catName: string;


    @ApiProperty({
        example: 'https://www.abcdefg',
        description: '이미지 url',
    })
    @IsString()
    @Column()
    @Column({ nullable: true })
    imgUrl?: string;


}
