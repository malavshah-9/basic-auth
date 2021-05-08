import status,{getReasonPhrase} from 'http-status-codes';
import {CustomError} from '../types/CustomError';
import config from '../config/environment';
class ResponseFormatter{
    getErrorResponse(errorCode=status.INTERNAL_SERVER_ERROR,errorMessage=getReasonPhrase(status.INTERNAL_SERVER_ERROR),stackTrace:Error=new Error('No stacktrace available')):CustomError{
        let errorResponse:CustomError={
            errorCode,
            errorMessage,
            stackTrace:config.ENV==='development'? stackTrace:null
        };
        return errorResponse;
    }
}

export default new ResponseFormatter();