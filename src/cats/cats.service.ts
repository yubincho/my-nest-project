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
        private catRepository: Repository<Cat>,
        private dataSource: DataSource,
    ) {
    }

    // async signup(body: CatRequestDto) {
    //     const { email, name, password } = body
    //     const isCatExist = await this.catRepository.exist({where: { email }})
    //
    //     if (isCatExist) {
    //         throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다.")
    //     }
    //
    //     const hashedPassword = await bcrypt.hash(body.password, 10)
    //
    //     const cat = await this.catRepository.create({ email, name, password: hashedPassword })
    //     await this.catRepository.save(cat)
    //
    //     // 프론트 : 비밀번호 숨기기
    //     cat.password = undefined
    //
    //     // dto로 반환하기 위해 id 찾아서 response dto 에 id 넣기
    //     const { id } = await this.catRepository.findOne({ where: { email: cat.email }})
    //
    //     return new CatResponseDto({ id, email, name })
    //
    // }
    //
    //
    // async findByEmail(email: string): Promise<Cat | null> {
    //
    //     const cat = await this.catRepository.findOneBy({ email })
    //     return cat
    // }
    //
    //
    // async findByIdWithoutPassword(catId: string): Promise<Cat | null> {
    //
    //     const cat = await this.catRepository.findOneBy({catId})
    //     return cat
    // }

}
