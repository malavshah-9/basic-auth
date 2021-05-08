import {Router} from 'express';
import status from 'http-status-codes';

const healthRoute=Router();

healthRoute.get('/health',(req,res)=>{
    res.status(status.OK).send('All Good!')
})

export default healthRoute;