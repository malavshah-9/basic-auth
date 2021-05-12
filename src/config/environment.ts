import env from 'dotenv';
env.config({
  encoding: 'utf-8',
});
export default {
  SERVER_PORT: process.env.PORT || 3000,
  ENV: process.env.ENV || 'development',
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};
