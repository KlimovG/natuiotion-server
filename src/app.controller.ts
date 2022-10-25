import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/modules/auth/service/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(AuthService) private auth: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.auth.login(req.user);
  // }
}
