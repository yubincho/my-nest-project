import {HttpException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import {CatRequestDto} from "./dto/cat.request.dto";
import {Cat} from "./entities/cat.entity";
import * as bcrypt from 'bcryptjs'



@Injectable()
export class CatsService {

    constructor(
        @InjectRepository(Cat)
        private catsRepository: Repository<Cat>,
    ) {
    }

    async uploadImg(cat: Cat, files: Express.Multer.File[]) {
        const fileName = `cats/${files[0].filename}`;

        console.log(fileName);

        const newCat = await this.findByIdAndUpdateImg(
            cat.id,
            fileName,
        );
        console.log(newCat);
        return newCat;
    }

    async findByIdAndUpdateImg(id: string, fileName: string) {
        const cat = await this.catsRepository.findOneBy({id})

        cat.imgUrl = `http://localhost:3000/media/${fileName}`

        const newCat = await this.catsRepository.save(cat)

        console.log(newCat)

        return newCat
    }

}
