import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Column} from "typeorm";

export class UserRequestDto {
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
        example: '쿠로미',
        description: '닉네임',
    })
    @IsString()
    @IsNotEmpty()
    nickname?: string;

    @ApiProperty({
        example: 'https://www.abcdefg',
        description: '프로필 url',
    })
    @IsString()
    profileImg?: string;
}
