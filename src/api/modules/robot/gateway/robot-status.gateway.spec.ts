import { Test, TestingModule } from '@nestjs/testing';
import { RobotStatusGateway } from './robot-status.gateway';

describe('RobotStatusGateway', () => {
  let gateway: RobotStatusGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RobotStatusGateway],
    }).compile();

    gateway = module.get<RobotStatusGateway>(RobotStatusGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
