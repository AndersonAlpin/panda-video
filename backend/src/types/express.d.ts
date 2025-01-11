import { Request } from 'express';
import { UserSession } from '../interfaces/user.interface';

export interface CustomRequest extends Request {
  user?: UserSession;
}
