import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {AuthModule} from "../auth/auth.module";
import {MulterModule} from "@nestjs/platform-express";
import multer from "multer";
import * as fs from 'fs';

@Module({
  imports: [
      TypeOrmModule.forFeature([Cat]),
      MulterModule.registerAsync({
      // dest: './upload',
          useFactory: () => ({
              storage: multer.diskStorage({
                  destination: (req, file, cb) => {
                      const uploadPath = './public/upload';
                      // 디렉터리가 존재하지 않으면 생성
                      if (!fs.existsSync(uploadPath)) {
                          fs.mkdirSync(uploadPath, { recursive: true });
                      }
                      cb(null, uploadPath); // 파일을 저장할 폴더 경로
                  },
                  filename: (req, file, cb) => {
                      cb(null, `${file.originalname}-${new Date().getTime()}`); // 파일의 원본 이름을 유지
                  },
              }),
          }),
      }),
  ],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
