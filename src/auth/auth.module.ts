import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./jwt/jwt.strategy";
import {UsersModule} from "../users/users.module";


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),

      UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ],
})
export class AuthModule {}
