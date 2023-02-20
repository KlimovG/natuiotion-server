import { Request } from 'express';
import { UserModel } from '../../../../api/modules/user/models/user.model';

export interface RequestWithUser extends Request {
  user: UserModel;
}
