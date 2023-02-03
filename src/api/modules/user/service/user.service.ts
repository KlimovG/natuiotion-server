import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from '../models/user.model';
import { Repository } from 'typeorm';
import { Md5 } from 'ts-md5';
import { UserMapper } from './user.mapper';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInput } from '../dto/input/user-reg-input.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('User');
  constructor(
    @InjectRepository(UserModel)
    private repository: Repository<UserModel>,
    private mapper: UserMapper,
  ) {}

  async create(input: UserRegistrationInput): Promise<UserModel> {
    const user = this.repository.create(input);

    return await this.repository.save(user);
  }

  findAll(): Promise<UserModel[]> {
    this.logger.log('Getting all users');
    return this.repository.find();
  }

  async getUser(email: string): Promise<UserDto> {
    const user = await this.findByLogin(email);
    return this.mapper.toUserDto(user);
  }

  async findByLogin(email: string): Promise<UserModel> {
    return await this.repository.findOneBy({ email });
  }

  async findById(id: number): Promise<UserDto> {
    const user = await this.repository.findOneBy({ id });
    if (user) {
      return this.mapper.toUserDto(user);
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
