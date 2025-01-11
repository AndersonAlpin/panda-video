import { Router } from 'express';
import userRouter from './user.router';
import authRouter from './auth.router';
import pandaIntegrationRouter from './panda-integration.router';

const routes = Router();

routes.get('/sd', (req, res) => {
  res.send('API is running.');
});

routes.use('/user', userRouter);
routes.use('/auth', authRouter);
routes.use('/video', pandaIntegrationRouter);

export default routes;
