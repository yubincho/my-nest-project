import {Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginRequestDto} from "./dto/login.request.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";

@ApiTags('Authentication')
@Controller('auth')
@UseInterceptors(SuccessInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data)
  }
}
