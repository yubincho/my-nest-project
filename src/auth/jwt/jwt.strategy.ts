import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 무시하지 않기 때문에 false로 한다.
            secretOrKey: 'secret',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}