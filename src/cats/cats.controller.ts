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
  ParseIntPipe, UseInterceptors, Res, Render, Req, UploadedFile, Injectable, UploadedFiles,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CatsService } from './cats.service';
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../common/utils/multer.optios";
import {Cat} from "./entities/cat.entity";
import {CurrentUser} from "../common/decorators/user.decorator";



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
  @UseInterceptors(FilesInterceptor('file', 10, multerOptions('cats')))
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>) {

    console.log('files', files)

    // const imageUrl = { imageUrl: `http://localhost:3000/media/cats/${files[0].originalname}` }
    if (files && files.length > 0) {
      console.log(files);



      // const imageUrl = `http://localhost:3000/media/cats/${files[0].filename}`;
      const imageUrl = files.map(file => `http://localhost:3000/media/cats/${file.filename}`);
      console.log('[imageUrls]', imageUrl)
      console.log('[imageUrl]', imageUrl)
      return { images: imageUrl }
    } else {
      'No files uploaded.'
    }
      // return imageUrl

      // return this.catsService.uploadImg(cat, file);

  }




}
