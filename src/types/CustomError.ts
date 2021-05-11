export interface CustomError {
  errorCode: Number;
  errorMessage: String;
  stackTrace?: Error | null;
}
export interface CustomResponse {
  isOkay: Boolean;
  result: Object;
}
