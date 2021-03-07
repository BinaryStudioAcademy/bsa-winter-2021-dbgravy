import { Express } from 'express';
import userRoute from './userRoute';
import applicationRoute from './applicationRoute';
import userOrganizationRoute from './userOrganizationRout';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/user/organization', userOrganizationRoute);
  app.use('/api/applications', applicationRoute);
};

export default routes;
