import express from 'express';
import routes from './routes';
import middleware from './middlewares';

const app = express();

middleware(app);
routes(app);

export default app;
