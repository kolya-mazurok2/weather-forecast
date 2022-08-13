import { Request, Response, Router } from 'express';
import cityRouter from './city.router';
import forecastRouter from './forecast.router';
import userRouter from './user.router';

const router = Router();

router.get('/ping', (_: Request, res: Response) => {
  res.send({
    message: 'pong',
  });
});
router.use('', userRouter);
router.use('/cities', cityRouter);
router.use('/forecasts', forecastRouter);

export default router;
