import winston, { Logger } from 'winston';

class CustomLogger {
  logger: Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({
          handleExceptions: true,
          level: 'debug',
        }),
      ],
    });
  }
  error(dirName: string, message: string, method: string, obj = {}) {
    this.logger.error(
      `Error occured at ${dirName} with message ${message} METHOD -> ${method}`,
      obj
    );
  }
  debug(dirName: string, message: string, method: string, obj = {}) {
    this.logger.debug(
      `Error occured at ${dirName} with message ${message} METHOD -> ${method}`,
      obj
    );
  }
}
export default new CustomLogger();
