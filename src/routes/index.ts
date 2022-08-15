import { Request, Response, Router } from 'express';
import { errorMessages } from '../errors/constants';
import cityRouter from './city.router';
import forecastRouter from './forecast.router';

const router = Router();

router.get('/ping', (_: Request, res: Response) =>
  res.send({
    message: 'pong',
  })
);

router.use('/cities', cityRouter);
router.use('/forecasts', forecastRouter);
router.get('*', (_: Request, res: Response) =>
  res.status(404).send({ message: errorMessages[404] })
);

export default router;
