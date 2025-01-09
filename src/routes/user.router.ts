import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Container from 'typedi';
import UserController from '../controllers/user.controller';


const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const userController = Container.get(UserController)
const router = Router();

router.post('/', asyncHandler(userController.create));
router.get('/', asyncHandler(userController.findAll));
router.get('/:id', asyncHandler(userController.findOne));
router.put('/:id', asyncHandler(userController.update));
router.delete('/:id', asyncHandler(userController.delete));

export default router;
