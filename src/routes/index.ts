import { Router } from 'express';
import userRouter from './user.router';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('API is running.');
});

routes.use('/user', userRouter);

export default routes;
