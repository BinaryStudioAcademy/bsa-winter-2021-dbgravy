import { Express } from 'express';
import userRoute from './userRoute';
import applicationRoute from './applicationRoute';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/applications', applicationRoute);
};

export default routes;
