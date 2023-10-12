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
  ParseIntPipe, UseInterceptors, Res, Render
} from '@nestjs/common';
import { Response } from 'express';
import { CatsService } from './cats.service';
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";



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

  @ApiOperation({ summary: 'html 붙이기 연습'})
  @Get()
  @Render('cats/index')
  getCurrentCat() {
    const data = { title: 'Title', subtitle: 'Subtitle' };
    return data
  }

  // @ApiOperation({ summary: '로그아웃'})
  // @Post('logout')
  // logOut() {
  //   return 'logout';
  // }

  @ApiOperation({ summary: '고양이 이미지 업로드'})
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCatImg() {
    return 'uploadImg';
  }


}
