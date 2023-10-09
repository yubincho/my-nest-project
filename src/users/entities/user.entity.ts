import {BaseEntity} from "../../base-entity/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


@Entity({ schema: 'cat', name: 'users' })
export class User extends BaseEntity{

    @ApiProperty({
        example: '캣츠@gmail.com',
        description: '이메일',
    })
    @IsEmail()
    @IsNotEmpty()
    @Column('varchar', { name: 'email', unique: true, length: 30 })
    email: string;

    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    @IsString()
    @Column()
    name: string;

    @ApiProperty({
        example: '쿠로미',
        description: '닉네임',
    })
    @IsString()
    @IsNotEmpty()
    @Column({ default: 'default_nickname' })
    nickname?: string;


    @ApiProperty({
        example: '123!@#*',
        description: '비밀번호',
    })
    @IsString()
    @IsNotEmpty()
    @Column('varchar', { name: 'password', length: 100, select: false })
    password: string;


    @Column({ nullable: true })
    public profileImg?: string;



}
