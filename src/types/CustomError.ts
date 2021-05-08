export interface CustomError{
    errorCode: Number;
    errorMessage: String;
    stackTrace?: Error | null;
}