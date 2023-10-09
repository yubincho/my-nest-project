import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginRequestDto} from "./dto/login.request.dto";
import * as bcrypt from 'bcryptjs'
import {JwtService} from '@nestjs/jwt'
import {UsersService} from "../users/users.service";
import {Payload} from "./jwt/jwt.payload";



@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}


    async jwtLogin(data: LoginRequestDto) {
        const { email, password } = data

        console.log('[password]', password)
        if (!email || !password) {
            throw new BadRequestException('이메일과 비밀번호는 필수 입력 사항입니다.');
        }


        // 1. email 있는지 검사. 2. 모델을 받이서 비밀번호 검사에 사용
        const user = await this.usersService.findByEmail(email)
        const userId = user.id
        console.log('[user]', user)
        console.log('[user.password]', user.password)
        if (!user) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.')
        }

        const userPassword = await this.usersService.findPasswordByEmail(email)

        // password 일치하는지 검사
        const isPasswordValidated: boolean = await bcrypt.compare(password, userPassword)
        console.log('[isPasswordValidated]%%', isPasswordValidated)
        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해 주세요.')
        }

        // 유효성 검사가 끝나면 jwt를 프론트에 반환, 프론트는 jwt를 받아서 안전한 곳에 저장함
        // jwt 만들기 , jwt 반환하기
        const payload: Payload = { email: user.email, sub: user.id }
        console.log('[payload]', payload)
        return {
            token: this.jwtService.sign(payload)
        }

    }



}
