import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response, Request } from 'express';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';
import { UserLoginInput } from '../../../../api/modules/user/dto/input/user-login-input.dto';
import { GetCurrentUser } from '../decorators/current-user.decorator';
import { RefreshGuard } from '../guards/refresh-token-jwt.guard';
import { TokenPayload } from '../service/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() user: UserRegistrationInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.authService.registration(user);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() input: UserLoginInput,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const tokens = await this.authService.login(input);
    response.send(tokens);
  }

  @UseGuards(RefreshGuard)
  @Get('authenticate')
  async authenticate(@GetCurrentUser() user: TokenPayload): Promise<any> {
    const tokens = await this.authService.refreshToken(
      user.sub,
      user.refreshToken,
    );
    return {
      id: user.sub,
      ...tokens,
    };
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() request: Request) {
    return await this.authService.refreshToken(
      request.user['sub'],
      request.user['refreshToken'],
    );
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUser('sub') id: number) {
    await this.authService.logout(id);
  }
}
