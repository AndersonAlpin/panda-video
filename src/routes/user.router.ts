import { NextFunction, Response, Router } from 'express';
import { Container } from 'typedi';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { CustomRequest } from '../types/express';

const asyncHandler = (fn: Function) => (req: CustomRequest, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const userController = Container.get(UserController);
const router = Router();

router.post('/', asyncHandler(userController.create));
router.get('/', authMiddleware, asyncHandler(userController.findAll));
router.get('/:id', authMiddleware, asyncHandler(userController.findOne));
router.put('/:id', authMiddleware, asyncHandler(userController.update));
router.delete('/:id', authMiddleware, asyncHandler(userController.delete));

export default router;
