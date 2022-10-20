import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../model/user.model';
import { Repository } from 'typeorm';
import { UserDto } from '../model/user.dto';
import { UserLoginDto } from '../model/user-login.dto';
import { Md5 } from 'ts-md5';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private repository: Repository<UserModel>,
  ) {}

  create(input: UserDto): Promise<UserModel> {
    return this.repository.save(input);
  }

  findAll(): Promise<UserModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<UserModel> {
    return this.repository.findOneBy({ id });
  }

  async findByLogin({ email, password }: UserLoginDto): Promise<UserModel> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (user.password !== Md5.hashStr(password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  findByLoginAndPassword(login: string, password: string): Promise<UserModel> {
    return this.repository.findOneBy({
      email: login,
      password: password,
    });
  }
}
