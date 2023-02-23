import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../../../api/modules/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';
import { UserLoginInput } from '../../../../api/modules/user/dto/input/user-login-input.dto';
import { JwtService } from './jwt.service';
import { UserMapper } from '../../../../api/modules/user/service/user.mapper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mapper: UserMapper,
  ) {}

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData.toString();
  }

  async registration({
    email: login,
    password,
    phone,
    name,
  }: UserRegistrationInput): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
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

    this.logger.log('Generate new user data with hashed password');

    const userData: UserRegistrationInput = {
      email: login,
      name,
      password: hash,
      phone,
    };

    try {
      const user = await this.usersService.create(userData);

      const { accessToken, refreshToken } = await this.jwtService.getTokens(
        user.id,
      );

      this.logger.log(`User with id ${user.id} was created`);

      return { accessToken, refreshToken };
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
    this.logger.log('Find user with login');
    //See if user not exist
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new BadRequestException('User not exist');
    }

    try {
      // Check if password are equal
      await this.verifyPassword(password, user.password);

      const { accessToken, refreshToken } = await this.jwtService.getTokens(
        user.id,
      );

      await this.updateRefresh(user.id, refreshToken);

      return {
        tokens: {
          accessToken,
          refreshToken,
        },
        user: this.mapper.toUserDto(user),
      };
    } catch (e) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async logout(userId: number) {
    await this.usersService.update(userId, {
      refreshToken: null,
    });
  }

  async verifyRefreshToken(userId: number, rt: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);

    if (!user?.refreshToken) throw new ForbiddenException('Access Denied');

    const isRefreshTokenMatches = await bcrypt.compare(rt, user.refreshToken);

    if (!isRefreshTokenMatches) throw new ForbiddenException('Access Denied');

    return true;
  }

  async refreshToken(userId: number, rt: string) {
    await this.verifyRefreshToken(userId, rt);

    const tokens = await this.jwtService.getTokens(userId);

    await this.updateRefresh(userId, tokens.refreshToken);
    const user = await this.usersService.findById(userId);
    return {
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      user: this.mapper.toUserDto(user),
    };
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

  async updateRefresh(userId: number, rt: string) {
    const hashedToken = await this.hashData(rt);

    try {
      await this.usersService.update(userId, {
        refreshToken: hashedToken,
      });
    } finally {
      this.logger.log('Refresh token was successfully updated');
    }
  }
}
