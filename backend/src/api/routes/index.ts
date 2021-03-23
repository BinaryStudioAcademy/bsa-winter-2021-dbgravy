import { Express } from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';
import applicationRoute from './applicationRoute';
import editorRoute from './editorRoute';
import resourceRoutes from './resourcesRoute';
import userOrganizationRoute from './userOrganizationRoute';
import organizationRoute from './organizationRoute';
import queriesRouter from './queriesRoute';
import editorRouter from './editorRouter';

const routes = (app: Express) => {
  app.use('/api/users', userRoute);
  app.use('/api/user/organization', userOrganizationRoute);
  app.use('/api/applications', applicationRoute);
  app.use('/api/editor', editorRoute);
  app.use('/api/resources', resourceRoutes);
  app.use('/api/auth', authRoute);
  app.use('/api/organization', organizationRoute);
  app.use('/api/queries', queriesRouter);
  app.use('/api/editor', editorRouter);
};

export default routes;
