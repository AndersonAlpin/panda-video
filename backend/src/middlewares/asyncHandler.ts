import { NextFunction, Response } from 'express';
import { CustomRequest } from "../types/express";

export const asyncHandler = (fn: Function) => (req: CustomRequest, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};