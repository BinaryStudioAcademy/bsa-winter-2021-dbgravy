import { Express } from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';
import applicationRoute from './applicationRoute';
// import userOrganizationRoute from './userOrganizationRout';
import resourceRoutes from './resourcesRoute';
import userOrganizationRoute from './userOrganizationRoute';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/user/organization', userOrganizationRoute);
  app.use('/api/applications', applicationRoute);
  // app.use('/api/auth', authRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/auth', authRoute);
};

export default routes;
