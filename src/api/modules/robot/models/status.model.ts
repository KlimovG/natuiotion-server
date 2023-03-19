import { registerEnumType } from '@nestjs/graphql';

export enum RobotStatus {
  ON = 'OP',
  ACTIVE = 'WORKING',
  LEFT_AREA = 'ANTI THEFT',
  PROBLEM = 'HS',
  OFF = 'OFF',
}

registerEnumType(RobotStatus, { name: 'RobotStatus' });
