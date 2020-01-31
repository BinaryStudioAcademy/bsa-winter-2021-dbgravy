import { Express } from 'express';
import userRoute from './user.route';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
};

export default routes;
