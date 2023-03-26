import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserMapper {
  toUserDto(data: UserModel, token?: string): UserDto {
    const { id, name } = data;
    if (token) {
      return { id, name, token };
    }
    return { id, name };
  }
}
