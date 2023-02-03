import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';
import { createCipheriv, randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';
import { UserLoginInput } from '../../../../api/modules/user/dto/input/user-login-input.dto';
import * as luxon from 'luxon';

const scrypt = promisify(_scrypt);

export interface TokenPayload {
  id: number;
  createdAt: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registration({
    email: login,
    password,
    phone,
    name,
  }: UserRegistrationInput): Promise<string> {
    this.logger.log('Check if the user with this login already exist');
    //See if user already in use
    const isUser = await this.usersService.findByLogin(login);
    if (!!isUser?.email) {
      throw new BadRequestException('User exist');
    }

    // Hash the users password
    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Hash the salt and the password
    const hash = await bcrypt.hash(password, salt);

    // Join the hashed password with the salt
    const resultPassword = hash.toString() + '.' + salt;

    this.logger.log('Generate new user data with hashed password');

    const userData: UserRegistrationInput = {
      email: login,
      name,
      password: resultPassword,
      phone,
    };
    try {
      const user = await this.usersService.create(userData);
      return `User with id ${user.id} was created`;
    } catch (error) {
      if (error.message.includes('User already exists')) {
        throw new ConflictException('User already exists');
      } else if (error.message.includes('Validation error')) {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login({ email: login, password }: UserLoginInput) {
    try {
      this.logger.log('Find user with login');
      //See if user not exist
      const user = await this.usersService.findByLogin(login);
      if (!user?.email) {
        throw new BadRequestException('User not exist');
      }

      // Hash the salt and the password
      const [_, salt] = user.password.split('.');
      const hash = await bcrypt.hash(password, salt);

      // Check if password are equal
      // const isPasswordsEqual = storedPassword === resultPassword;
      // const isPasswordsEqual = await bcrypt.compare(password, hash);
      await this.verifyPassword(password, hash);

      return await this.usersService.getUser(login);
    } catch (e) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    // const tokenPayload = this.generateTokenPayload(user);
    //
    // const expires = new Date();
    // expires.setSeconds(
    //   expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    // );
    // const token = await this.jwtService.signAsync(tokenPayload);

    // response.cookie('Authentication', token, {
    //   httpOnly: true,
    //   expires,
    // });
  }

  async getTokens(user: UserDto) {
    const payload = this.generateTokenPayload(user);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS'),
        expiresIn: this.configService.get<number>('JWT_ACCESS_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH'),
        expiresIn: this.configService.get<number>('JWT_REFRESH_EXPIRATION'),
      }),
    ]);

    return [accessToken, refreshToken];
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordsEqual = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordsEqual) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private generateTokenPayload(user: UserDto): TokenPayload {
    const createdAt = luxon.DateTime.now().toString();

    return { id: user.id, createdAt };
  }
}
