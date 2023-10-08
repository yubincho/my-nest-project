import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {Cat} from "../entities/cat.entity";
import {PickType} from "@nestjs/mapped-types";
import {ApiProperty} from "@nestjs/swagger";

export class CatRequestDto {
    @ApiProperty({
        example: '캣츠@gmail.com',
        description: '이메일',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '123!@#*',
        description: '비밀번호',
    })
    @IsString()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'https://www.abcdefg',
        description: '이미지 url',
    })
    @IsString()
    imgUrl?: string;
}
