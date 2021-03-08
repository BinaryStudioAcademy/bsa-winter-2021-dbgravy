import { Express } from 'express';
import userRoute from './userRoute';
import authRoutes from './authRoutes';
import applicationRoute from './applicationRoute';
import userOrganizationRoute from './userOrganizationRout';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/user/organization', userOrganizationRoute);
  app.use('/api/applications', applicationRoute);
  app.use('/api/auth', authRoutes);
};

export default routes;
