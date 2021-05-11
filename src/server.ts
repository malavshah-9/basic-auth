import express from 'express';

import cors from 'cors';
import moragan from 'morgan';
import listEndpoints from 'express-list-endpoints';
import compression from 'compression';
import methodOverride from 'method-override';
import { createHttpTerminator } from 'http-terminator';
import bodyParser from 'body-parser';
import status, { getReasonPhrase } from 'http-status-codes';

import environment from './config/environment';
import dbClient from './sequelize/index';
import healthRouter from './routes/health';
import userRouter from './routes/user';
import ResponseFormatter from './util/ResponseFormatter';

const app = express();

const main = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(moragan('combined'));
  app.use(compression({ level: 1 }));
  app.use(methodOverride());
  // from below line define all custom routes
  app.use(healthRouter);
  app.use(userRouter);
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
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json(
        ResponseFormatter.getErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          getReasonPhrase(status.INTERNAL_SERVER_ERROR),
          err
        )
      );
  });
  await connectDB();
  const server = app.listen(environment.SERVER_PORT, () => {
    console.log(` Server started at PORT - ${environment.SERVER_PORT}`);
    const allRoutes = listEndpoints(app);
    console.log(`Below routes are mounted for app`);
    console.log(allRoutes);
  });
  const httpTerminator = createHttpTerminator({
    server: server,
    gracefulTerminationTimeout: 10000,
  });

  function shutDown() {
    console.log('Received kill signal, shutting down gracefully ');
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });
    setTimeout(() => {
      console.log(
        'Could not close connections in time, forcefully shutting down'
      );
      process.exit(1);
    }, 10000);
    httpTerminator.terminate();
  }
  process.on('SIGTERM', shutDown);
  process.on('SIGINT', shutDown);
  process.on('uncaughtException', (e) => {
    console.log('UncaughtException ', e);
    process.exit(1);
  });
  process.on('unhandledRejection', (e) => {
    console.log('UncaughtException ', e);
  });
};

async function connectDB() {
  try {
    await dbClient.getClient().authenticate();
    console.log(' Database connection is ok');
  } catch (e) {
    console.log(' error occured in connection to database ', e);
  }
}
main();
