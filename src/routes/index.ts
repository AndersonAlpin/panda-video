import { Router } from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('API is running.');
});

routes.use('/user', userRouter);
routes.use('/auth', authRouter);

export default routes;
