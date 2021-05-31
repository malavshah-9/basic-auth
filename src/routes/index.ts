import { Application } from 'express';
import status, { getReasonPhrase } from 'http-status-codes';
import listEndpoints from 'express-list-endpoints';
import userRouter from '../components/user/v1/user.routes';
import CityRouter from '../components/city/v1/city.routes';
import healthRouter from './health';
import { PREFIX_ROUTE_V1_API } from '../util/constants';
import ResponseFormatter from '../util/ResponseFormatter';

export default function (app: Application) {
  app.use(PREFIX_ROUTE_V1_API, userRouter);
  app.use(PREFIX_ROUTE_V1_API, healthRouter);
  app.use(PREFIX_ROUTE_V1_API, CityRouter);
  app.use((_, res) => {
    // Route not found handler
    return res
      .status(status.NOT_FOUND)
      .json(
        ResponseFormatter.getErrorResponse(
          status.NOT_FOUND,
          getReasonPhrase(status.NOT_FOUND)
        )
      );
  });
  app.use((err, req, res, next) => {
    // @ts-ignore
    req.log.error('Error occured ', JSON.stringify(err, {}, 4));
    return res
      .status(err.statusCode || status.INTERNAL_SERVER_ERROR)
      .json(
        ResponseFormatter.getErrorResponse(
          err.statusCode || status.INTERNAL_SERVER_ERROR,
          getReasonPhrase(err.statusCode || status.INTERNAL_SERVER_ERROR),
          err
        )
      );
  });
  let allRoutes = listEndpoints(app);
  console.table(allRoutes);
}
