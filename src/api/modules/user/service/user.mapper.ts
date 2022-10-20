import { Injectable } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { UserDto } from '../model/user.dto';

@Injectable()
export class UserMapper {
  toUserDto(data: UserModel): UserDto {
    const { id, name, email, phone } = data;
    return { id, name, email, phone };
  }
}
