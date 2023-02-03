import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserRegistrationInput } from '../../../../api/modules/user/dto/input/user-reg-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async createUser(
    @Body() user: UserRegistrationInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    return await this.authService.registration(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuthenticated() {
    return true;
  }
}
