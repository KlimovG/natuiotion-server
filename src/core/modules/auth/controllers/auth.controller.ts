import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';
import { UserLoginInput } from '../../../../api/modules/user/dto/input/user-login-input.dto';
import { ConfigService } from '@nestjs/config';
import * as luxon from 'luxon';
import { DateTime } from 'luxon';
import { RequestWithUserInterface } from '../utils/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('registration')
  async createUser(
    @Body() user: UserRegistrationInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return await this.authService.registration(user);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() login: UserLoginInput,
    @Res({ passthrough: true }) response: Response,
    @Req() request: RequestWithUserInterface,
  ) {
    const tokenExpiration = (tokenName: string): Date => {
      const nowInMillis = DateTime.local().toMillis();
      const expiration = this.configService.get<string>(tokenName);
      return DateTime.fromMillis(nowInMillis)
        .toUTC()
        .setZone('Europe/Paris')
        .toJSDate();
    };

    const [accessToken, refreshToken] = await this.authService.getTokens(
      request.user,
    );
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });

    response.send(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuthenticated() {
    return true;
  }
}
