import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInput, UserModel } from '../models/user.model';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../models/user-login.dto';
import { Md5 } from 'ts-md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private repository: Repository<UserModel>,
  ) {}

  async create(input: UserInput): Promise<UserModel> {
    const hashPwd = Md5.hashStr(input.password);
    return await this.repository.save({ ...input, password: hashPwd });
  }

  findAll(): Promise<UserModel[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<UserModel> {
    return this.repository.findOneBy({ id });
  }

  async findByLogin(email: string): Promise<UserModel> {
    return await this.repository.findOneBy({ email });
  }

  findByLoginAndPassword(login: string, password: string): Promise<UserModel> {
    return this.repository.findOneBy({
      email: login,
      password: Md5.hashStr(password),
    });
  }
}
