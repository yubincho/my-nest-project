import {PickType} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";


export class LoginRequestDto extends PickType(User, ['email', 'password'] as const){}