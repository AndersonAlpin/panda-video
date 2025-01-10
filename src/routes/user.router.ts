import { NextFunction, Response, Router } from 'express';
import { Container } from 'typedi';
import UserController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { asyncHandler } from '../middlewares/asyncHandler';

const userController = Container.get(UserController);
const router = Router();

router.get('/', authMiddleware, asyncHandler(userController.findAll));
router.get('/:id', authMiddleware, asyncHandler(userController.findOne));
router.put('/:id', authMiddleware, asyncHandler(userController.update));
router.delete('/:id', authMiddleware, asyncHandler(userController.delete));

export default router;
