import {Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";

import {UserRequestDto} from "./dto/user.request.dto";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import { Request } from 'express'
import {UserResponseDto} from "./dto/user.response.dto";


@ApiTags('USER')
@Controller('users')
@UseInterceptors(SuccessInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserResponseDto
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
