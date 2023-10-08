import {ApiProperty} from "@nestjs/swagger";
import {IsEmail} from "class-validator";

export class CatResponseDto {

    constructor({ id, name, email }: { id: number; name: string; email: string }) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    @ApiProperty({
        example: '3',
        description: '아이디',
    })
    id: number;

    @ApiProperty({
        example: '캣츠@gmail.com',
        description: '이메일',
    })
    email: string;


    @ApiProperty({
        example: '김철수',
        description: '이름',
    })
    name: string;

    // @ApiProperty({
    //     example: 'https://www.abcdefg',
    //     description: '이미지 url',
    // })
    // imgUrl?: string;

}