import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';
import { createCipheriv, randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';

const scrypt = promisify(_scrypt);

export interface TokenPayload {
  username: string;
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(user: UserDto, response: Response) {
    const tokenPayload = this.generateTokenPayload(user);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    // Hash the users password
    // Generate a salt
    const salt = await bcrypt.genSalt();
    const token = await this.jwtService.signAsync(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

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

    const user = await this.usersService.create(userData);

    return !!user?.email ? 'User created' : 'USer creation was failed';
  }

  async getTokens(user: UserDto) {
    const payload = this.generateTokenPayload(user);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_SECRET_EXPIRATION'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateTokenPayload(user: UserDto): TokenPayload {
    return { username: user.name, email: user.email, id: user.id };
  }
}
