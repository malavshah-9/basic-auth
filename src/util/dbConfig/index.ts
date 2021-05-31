import { Sequelize } from 'sequelize';
import { Up } from './seed';
import ENV from '../../config/environment';

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
    // this.dbClient.sync({
    //   force: true,
    // });
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
