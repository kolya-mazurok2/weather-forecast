import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { dataSource } from './config/database';
import router from './routes';
import jobs from './jobs';
import apiErrorMiddleware from './middlewares/api-error.middleware';
import cors from 'cors';

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('tiny'));

app.use(
  cors({
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Headers', 'Content-Type', 'API-Key'],
  })
);

app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) =>
  apiErrorMiddleware(err, req, res)
);

(async () => {
  try {
    await dataSource.initialize();

    if (process.env.ENV === 'prod') {
      jobs();
    }

    app.listen(PORT, () => {
      console.log(`Server is running at URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Database connection can not be established. Reason: ${error}`);
    process.exit(1);
  }
})();
