import { Router } from 'express';
import { Container } from 'typedi';
import AuthController from '../controllers/auth.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

const authController = Container.get(AuthController);
const router = Router();

router.post('/signup', asyncHandler(authController.signup));
router.post('/login', asyncHandler(authController.login));

export default router;
