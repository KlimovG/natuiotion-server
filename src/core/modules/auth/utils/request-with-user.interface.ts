import { Request } from 'express';
import { UserDto } from '../../../../api/modules/user/dto/user.dto';

export interface RequestWithUserInterface extends Request {
  user: UserDto;
}
