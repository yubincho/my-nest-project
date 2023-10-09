import {PickType} from "@nestjs/swagger";
import {Cat} from "../../cats/entities/cat.entity";


export class LoginRequestDto extends PickType(Cat, ['email', 'password'] as const){}