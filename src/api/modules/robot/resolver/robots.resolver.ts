import { RobotModel } from '../models/robot.model';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RobotsService } from '../service/robots.service';
import { UserService } from '../../user/service/user.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';
import { GetCurrentUser } from '../../../../core/modules/auth/decorators/current-user.decorator';
import { TokenPayload } from '../../../../core/modules/auth/service/jwt.service';

@Resolver((of) => RobotModel)
export class RobotsResolver {
  private readonly logger = new Logger('Robot');

  constructor(
    @Inject(RobotsService)
    private robotService: RobotsService,
    @Inject(UserService) private customerService: UserService,
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query((returns) => String)
  async getRobotStatus(@Args('name') name: string): Promise<any> {
    const status = await this.httpService.get(
      `http://172.16.3.5:8080/api/v1/data_gathering/last_robots_status?serial_number=${name}`,
    );
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `http://172.16.3.5:8080/api/v1/data_gathering/last_robots_status?serial_number=${name}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    console.log(data);

    return name;
  }

  @UseGuards(AccessTokenGuard)
  @Query((returns) => [RobotModel])
  async getAllRobotsWithCustomers(
    @GetCurrentUser() { sub }: TokenPayload,
  ): Promise<RobotModel[]> {
    this.logger.log(`Getting robots for user ${sub}`);
    return await this.robotService.findByCustomer(sub);
  }
}
