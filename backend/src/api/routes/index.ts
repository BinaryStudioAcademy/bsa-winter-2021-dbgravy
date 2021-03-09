import { Express } from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';
import applicationRoute from './applicationRoute';
import userOrganizationRoute from './userOrganizationRoute';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/user/organization', userOrganizationRoute);
  app.use('/api/applications', applicationRoute);
  app.use('/api/auth', authRoute);
};

export default routes;
