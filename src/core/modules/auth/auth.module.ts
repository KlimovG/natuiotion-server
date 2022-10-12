import { Module } from '@nestjs/common';
import { UserModule } from '../../../api/modules/user/user.module';

@Module({
  imports: [UserModule],
})
export class AuthModule {}
