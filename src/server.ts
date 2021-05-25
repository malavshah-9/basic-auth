import { createServer } from 'http';
import dotenv from 'dotenv';
import environment from './config/environment';
import dbClient from './util/dbConfig';
import app from './app';

dotenv.config();
const server = createServer(app);

(async () => {
  await connectDB();
  server.listen(environment.SERVER_PORT, () => {
    console.log(` Server started at PORT - ${environment.SERVER_PORT}`);
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
})();

async function connectDB() {
  try {
    await dbClient.getClient().authenticate();
    console.log(' Database connection is ok');
  } catch (e) {
    console.log(' error occured in connection to database ', e);
  }
}
