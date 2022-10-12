import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../model/user.model';
import { Repository } from 'typeorm';
import { UserDto } from '../model/user.dto';

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

  findByLoginAndPassword(login: string, password: string): Promise<UserModel> {
    return this.repository.findOneBy({
      email: login,
      password: password,
    });
  }
}
