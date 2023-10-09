import {Body, Controller, Get, Post, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginRequestDto} from "./dto/login.request.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {JwtAuthGuard} from "./jwt/jwt.guard";
import {Request} from "express";

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    console.log('[data]', data)
    return this.authService.jwtLogin(data)
  }

  @ApiOperation({ summary: '현재 유저 가져오기'})
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() req: Request) {
    return req.user
  }
}
