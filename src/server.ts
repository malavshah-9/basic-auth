import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import moragan from 'morgan';
import listEndpoints from 'express-list-endpoints';
import compression from 'compression';
import methodOverride from 'method-override';
import { createHttpTerminator } from 'http-terminator';
import status, { getReasonPhrase } from 'http-status-codes';

import environment from './config/environment';
import healthRouter from './routes/health';
import ResponseFormatter from './util/ResponseFormatter'


const app=express();

env.config({
    encoding: 'utf-8'
})

const main=()=>{
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(moragan('combined'));
    app.use(compression({ level: 1 }));
    app.use(methodOverride());
    // from below line define all custom routes
    app.use(healthRouter);
    app.use((_,res)=>{ // Route not found handler
        return res.status(status.NOT_FOUND).json(ResponseFormatter.getErrorResponse(status.NOT_FOUND,getReasonPhrase(status.NOT_FOUND)));
    });
    app.use((err,req,res,next)=>{
        return res.status(status.INTERNAL_SERVER_ERROR).json(ResponseFormatter.getErrorResponse(status.INTERNAL_SERVER_ERROR,getReasonPhrase(status.INTERNAL_SERVER_ERROR),err));
    })
    const server=app.listen(environment.SERVER_PORT,()=>{
        console.log(` Server started at PORT - ${environment.SERVER_PORT}`);
        const allRoutes=listEndpoints(app);
        console.log(`Below routes are mounted for app`);
        console.log(allRoutes)
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
}
main();