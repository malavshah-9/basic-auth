import { Application, urlencoded } from 'express';
import cors from 'cors';
import moragan from 'morgan';
import compression from 'compression';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import pino from 'pino-http';

export default function (app: Application) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(
    pino({
      customLogLevel: (res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn';
        } else if (res.statusCode >= 500 || err) {
          return 'error';
        }
        return 'info';
      },
    })
  );
  app.use(urlencoded({ extended: true }));
  app.use(moragan('combined'));
  app.use(compression({ level: 1 }));
  app.use(methodOverride());
}
