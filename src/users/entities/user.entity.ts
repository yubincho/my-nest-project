import {BaseEntity} from "../../base-entity/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


@Entity({ schema: 'cat', name: 'users' })
export class User extends BaseEntity{

    @ApiProperty({
        example: 1,
        description: '사용자 아이디'
    })
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @ApiProperty({
        example: '캣츠@gmail.com',
        description: '이메일',
    })
    @IsEmail()
    @IsNotEmpty()
    @Column('varchar', { name: 'email', unique: true, length: 30 })
    email: string;


    @ApiProperty({
        example: '쿠로미',
        description: '닉네임',
    })
    @IsString()
    @IsNotEmpty()
    @Column('varchar', { name: 'nickname', length: 30 })
    nickname: string;


    @ApiProperty({
        example: '123!@#*',
        description: '비밀번호',
    })
    @IsString()
    @IsNotEmpty()
    @Column('varchar', { name: 'password', length: 100, select: false })
    password: string;






}
