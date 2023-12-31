import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./jwt/jwt.strategy";
import {UsersModule} from "../users/users.module";
import process from "process";
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),

      UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ],
})
export class AuthModule {}
