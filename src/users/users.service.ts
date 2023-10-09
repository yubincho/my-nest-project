import {HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {UserRequestDto} from "./dto/user.request.dto";
import {UserResponseDto} from "./dto/user.response.dto";
import * as bcrypt from 'bcryptjs'


@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>,
      private dataSource: DataSource,
  ) {
  }

  async signup(body: UserRequestDto) {
    const { email, name, nickname, password } = body
    const isUserExist = await this.usersRepository.exist({where: { email }})

    if (isUserExist) {
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다.")
    }

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await this.usersRepository.create({ email, name, password: hashedPassword })
    await this.usersRepository.save(user)

    // 프론트 : 비밀번호 숨기기
    user.password = undefined

    // dto로 반환하기 위해 id 찾아서 response dto 에 id 넣기
    const { id } = await this.usersRepository.findOne({ where: { email: user.email }})

    return new UserResponseDto({ id, email, name, nickname })

  }


  async findByEmail(email: string): Promise<User | null> {

    // const user = await this.usersRepository.findOne({where: { email }})
    // console.log('[user]###', user)
    // if (user) return user;
    // throw new HttpException('No User', HttpStatus.NOT_FOUND);
    // return user
    return this.usersRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();

  }

  async findPasswordByEmail(email: string): Promise<string | undefined> {
    const queryBuilder = this.usersRepository
        .createQueryBuilder('user')
        .select('user.password')
        .where('user.email = :email', { email })
        .getOne();

    const user = await queryBuilder;
    return user?.password; // 반환 전에 null 체크를 해줍니다.
  }


  async findByIdWithoutPassword(userId: string): Promise<User | null> {

    const user = await this.usersRepository.findOne({where: {id : userId}})
    // console.log('[user]###222', user)
    // if (user) return user;
    // throw new HttpException('No User', HttpStatus.NOT_FOUND);
    return user
  }

}
