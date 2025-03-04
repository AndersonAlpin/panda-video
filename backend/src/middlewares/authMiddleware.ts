import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserSession } from '../interfaces/user.interface';
import { CustomRequest } from '../types/express';
import { envConfig } from '../config/envConfig';

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization;
    
    if (!authorizationHeader) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authorizationHeader.split(' ')[1];
    const secretKey = envConfig.AUTH.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey) as UserSession;

    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

