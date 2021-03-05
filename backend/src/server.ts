import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import passport from 'passport';
import { env } from './env';
import routes from './api/routes';
import './config/passportConfig';
import { errorHandlerMiddleware } from './api/middlewares/errorHandlerMiddleware';

const app = express();

createConnection()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

routes(app);

app.use(errorHandlerMiddleware);
app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${env.app.port}.`);
});

export default app;
