import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseFilters,
  ParseIntPipe, UseInterceptors
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {HttpExceptionFilter} from "../common/filters/http-exception.filter";
import {CatRequestDto} from "./dto/cat.request.dto";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";



@ApiTags('CAT')
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @UseFilters(HttpExceptionFilter)
  // @Get()
  // findAll() {
  //   // throw new HttpException({ success: false, message: 'api is broken'}, 401)
  //   throw new HttpException('api is broken', 401)
  //   return this.catsService.findAll();
  // }

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  // @ApiResponse({
  //   status: 200,
  //   description: '성공',
  //   type: CatResponseDto
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: '서버에러',
  // })
  // @ApiOperation({ summary: '회원가입'})
  // @Post()
  // async signUp(@Body() body: CatRequestDto) {
  //   console.log(body);
  //
  //   return await this.catsService.signup(body)
  // }

  // @ApiOperation({ summary: '로그인'})
  // @Post('login')
  // logIn() {
  //   return 'login';
  // }
  //
  // @ApiOperation({ summary: '로그아웃'})
  // @Post('logout')
  // logOut() {
  //   return 'logout';
  // }

  @ApiOperation({ summary: '고양이 이미지 업로드'})
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }


}
