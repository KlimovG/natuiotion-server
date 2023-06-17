import { Module } from '@nestjs/common';
import { PollsController } from './controllers/polls.controller';

@Module({
  controllers: [PollsController],
})
export class PollsModule {}
