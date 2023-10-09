import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Payload} from "./jwt.payload";
import {UsersService} from "../../users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 무시하지 않기 때문에 false로 한다.
            secretOrKey: 'secret',
        });
    }

    async validate(payload: Payload) {
       const user =  await this.usersService.findByIdWithoutPassword(payload.sub)

        if (user) {
            return user; // request.user
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}