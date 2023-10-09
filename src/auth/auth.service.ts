import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Cat} from "../cats/entities/cat.entity";
import {Repository} from "typeorm";
import {LoginRequestDto} from "./dto/login.request.dto";
import * as bcrypt from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'
import {CatsService} from "../cats/cats.service";



@Injectable()
export class AuthService {

    constructor(
        private readonly catsService: CatsService,
        private readonly jwtService: JwtService,
    ) {}


    async jwtLogin(data: LoginRequestDto) {
        const { email, password } = data

        // 1. email 있는지 검사. 2. 모델을 받이서 비밀번호 검사에 사용
        const cat = await this.catsService.findByEmail(email)

        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.')
        }

        // password 일치하는지 검사
        const isPasswordValidated: boolean = await bcrypt.compare(password, cat.password)

        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.')
        }

        // 유효성 검사가 끝나면 jwt를 프론트에 반환, 프론트는 jwt를 받아서 안전한 곳에 저장함
        // jwt 만들기 , jwt 반환하기
        const payload = { email: email, sub: cat.id}

        return {
            token: this.jwtService.sign(payload)
        }

    }



}
