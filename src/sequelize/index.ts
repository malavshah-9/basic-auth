import { Sequelize } from 'sequelize';
import ENV from '../config/environment';

class DBclient {
  dbClient: Sequelize;
  constructor() {
    this.dbClient = new Sequelize({
      dialect: 'mysql',
      database: ENV.DATABASE_NAME,
      username: ENV.DATABASE_USER,
      password: ENV.DATABASE_PASSWORD,
      host: ENV.DATABASE_HOST,
      port: parseInt(ENV.DATABASE_PORT + ''),
    });
  }
  getClient() {
    if (!this.dbClient) {
      this.dbClient = new Sequelize({
        dialect: 'mysql',
        database: ENV.DATABASE_NAME,
        username: ENV.DATABASE_USER,
        password: ENV.DATABASE_PASSWORD,
        host: ENV.DATABASE_HOST,
        port: parseInt(ENV.DATABASE_PORT + ''),
      });
    }
    return this.dbClient;
  }
}
export default new DBclient();
