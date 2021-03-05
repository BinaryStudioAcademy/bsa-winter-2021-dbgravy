import express from 'express';
import bodyParser from 'body-parser';
import { env } from './env';
import routes from './api/routes';
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(env.app.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${env.app.port}.`);
});

export default app;
