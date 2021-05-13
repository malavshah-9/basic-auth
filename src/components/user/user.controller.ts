import status from 'http-status-codes';

import user from './user.model';
import JWT from '../../services/JWTGenerator.service';
import HashMan from '../../services/HashMan.service';
import ResponseFormatter from '../../util/ResponseFormatter';
import { HasMany } from 'sequelize/types';

class UserController {
  constructor() {}
  async addNewUser(req, res, next) {
    let email, password;
    email = req.body.email;
    password = req.body.password;
    if (email && password) {
      try {
        let hashedPassword = await HashMan.getHashedKey(password);
        console.log({ hashedPassword });
        let dbResult = await user.create({
          email,
          hashedPassword,
        });
        let accessToken = await JWT.signToken({
          userId: dbResult.getDataValue('id'),
          issuer: 'auth-app',
        });
        let refreshToken = await JWT.signToken({
          userId: dbResult.getDataValue('id'),
        });
        return res.status(status.OK).json(
          ResponseFormatter.getSuccessResponse(true, {
            accessToken,
            refreshToken,
          })
        );
      } catch (e) {
        let errors = e.errors.map((item) => item.message);
        next({
          statusCode: status.UNPROCESSABLE_ENTITY,
          errors,
        });
      }
    } else {
      next({
        statusCode: status.BAD_REQUEST,
        message: 'Please enter valid data',
      });
    }
  }
  async signIn(req, res, next) {
    let email, password;
    email = req.body.email;
    password = req.body.password;
    if (email && password) {
      try {
        let dbResult = await user.findOne({
          where: {
            email,
          },
        });
        res.status(200).json(dbResult);
      } catch (e) {
        next(e);
      }
    } else {
      next({
        statusCode: status.BAD_REQUEST,
        message: 'Please enter valid data',
      });
    }
  }
}
export default new UserController();
