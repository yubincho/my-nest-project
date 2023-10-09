import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {CatResponseDto} from "../cats/dto/cat.response.dto";
import {UserRequestDto} from "./dto/user.request.dto";

@ApiTags('USER')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: CatResponseDto
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '회원가입'})
  @Post()
  async signUp(@Body() body: UserRequestDto) {
    console.log(body);

    return await this.usersService.signup(body)
  }


}
