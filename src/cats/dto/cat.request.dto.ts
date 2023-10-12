import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {Cat} from "../entities/cat.entity";
import {PickType} from "@nestjs/mapped-types";
import {ApiProperty} from "@nestjs/swagger";

export class CatRequestDto {




    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    @IsString()
    @IsNotEmpty()
    catName: string;

    @ApiProperty({
        example: 'https://www.abcdefg',
        description: '이미지 url',
    })
    @IsString()
    imgUrl?: string;



}
