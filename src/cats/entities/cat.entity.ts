
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {BaseEntity} from "../../base-entity/base.entity";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";



@Entity({ schema: 'cat', name: 'cats' })
export class Cat extends BaseEntity {

    // @ApiProperty({
    //     example: '캣츠@gmail.com',
    //     description: '이메일',
    // })
    // @IsEmail()
    // @IsNotEmpty()
    // @Column({ unique: true })
    // email: string;


    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    @IsString()
    @Column({ nullable: false })
    catName: string;

    // @ApiProperty({
    //     example: '123!@#*',
    //     description: '비밀번호',
    // })
    // @IsString()
    // @Column({ nullable: false })
    // password: string;

    @ApiProperty({
        example: 'https://www.abcdefg',
        description: '이미지 url',
    })
    @IsString()
    @Column()
    @Column({ nullable: true })
    imgUrl?: string;


}
