import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { Repository } from 'typeorm';
import { Md5 } from 'ts-md5';
import { UserMapper } from './user.mapper';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInput } from '../dto/input/user-reg-input.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private repository: Repository<UserModel>,
    private mapper: UserMapper,
  ) {}

  async create(input: UserRegistrationInput): Promise<UserModel> {
    const hashPwd = Md5.hashStr(input.password);
    return await this.repository.save({ ...input, password: hashPwd });
  }

  findAll(): Promise<UserModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<UserModel> {
    return this.repository.findOneBy({ id });
  }

  async getUser(email: string): Promise<UserDto> {
    const user = await this.findByLogin(email);
    return this.mapper.toUserDto(user);
  }

  private async findByLogin(email: string): Promise<UserModel> {
    return await this.repository.findOneBy({ email });
  }

  async findByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<UserModel> {
    return await this.repository.findOneBy({
      email: login,
      password: Md5.hashStr(password),
    });
  }
  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.findByLogin(email);
    const isPasswordValid = Md5.hashStr(password) === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return this.mapper.toUserDto(user);
  }
}
