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
  ParseIntPipe, UseInterceptors, Res, Render, Req, UploadedFile, Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";



@ApiTags('CAT')
@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
      private readonly catsService: CatsService,

  ) {}

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


  @Get('upload') // GET 요청을 받도록 수정
  @Render('cats/cat-uploadImg')
  uploadCatImgPage() {
    return {};
  }

  @ApiOperation({ summary: '고양이 이미지 업로드 처리'})
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadCatImg(@UploadedFile() file, @Res() res: Response) {

    console.log(file.name); // 업로드된 파일의 이름
    console.log(file.size); // 업로드된 파일의 크기

    console.log(file)

    // 이미지 업로드 후 이미지 URL 반환
    const imageUrl = `/public/upload/`+ file.originalname
    console.log(imageUrl)

    // 응답 헤더 설정
    res.setHeader('Content-Type', 'image/jpeg');

    res.status(200).json({ imageUrl });

  }



}
