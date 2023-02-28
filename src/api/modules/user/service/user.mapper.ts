import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserMapper {
  toUserDto(data: UserModel): UserDto {
    const { id, name } = data;
    return { id, name };
  }
}
