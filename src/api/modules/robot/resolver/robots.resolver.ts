import { RobotModel } from '../models/robot.model';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RobotsService } from '../service/robots.service';
import { UserService } from '../../user/service/user.service';
import { AccessTokenGuard } from '../../../../core/modules/auth/guards/access-token.guard';
import { GetCurrentUser } from '../../../../core/modules/auth/decorators/current-user.decorator';
import { TokenPayload } from '../../../../core/modules/auth/service/jwt.service';

@Resolver(() => RobotModel)
export class RobotsResolver {
  private readonly logger = new Logger('Robot');

  constructor(
    @Inject(RobotsService)
    private robotService: RobotsService,
    @Inject(UserService) private customerService: UserService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Query(() => [RobotModel])
  async getRobotForUser(
    @GetCurrentUser() user: TokenPayload,
  ): Promise<RobotModel[]> {
    this.logger.log(`Getting robots for user ${user.sub}`);
    return await this.robotService.findByCustomer(user.sub);
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => RobotModel)
  async getRobotStatus(@Args('serial') serial: string): Promise<RobotModel> {
    this.logger.log(`Getting status for robot ${serial}`);
    return null;
    // return await this.robotService.getRobotWithStatus(serial);
  }
}
