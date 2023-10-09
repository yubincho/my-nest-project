import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {TypeOrmModule} from "@nestjs/typeorm";
import process from "process";
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import {Cat} from "./cats/entities/cat.entity";
import { AuthModule } from './auth/auth.module';

@Module({

  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    entities: [Cat],
    keepConnectionAlive: true,
    charset: 'utf8mb4_general_ci',
    synchronize: false, //
    logging: process.env.NODE_ENV !== 'production',
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('*');
  }
}
