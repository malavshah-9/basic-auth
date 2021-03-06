import status, { StatusCodes } from 'http-status-codes';

import user from '../schema/user.schema';
import JWT from '../../../util/jwtGenerator/JWTGenerator.service';
import HashMan from '../../../util/hashman/HashMan.service';
import ResponseFormatter from '../../../util/ResponseFormatter';
import logger from '../../../util/logger/logger';

class UserController {
  constructor() {}
  async addNewUser(req, res, next) {
    let email, password;
    email = req.body.email;
    password = req.body.password;
    if (email && password) {
      try {
        let hashedPassword = await HashMan.getHashedKey(password);
        let dbResult = await user.create({
          email,
          password: hashedPassword,
        });
        if (dbResult) {
          return res.status(status.OK).json(
            ResponseFormatter.getSuccessResponse(true, {
              message: 'Successfully Signed Up!!!. Please login again',
            })
          );
        } else {
          return res
            .status(status.UNPROCESSABLE_ENTITY)
            .json(
              ResponseFormatter.getErrorResponse(
                status.UNPROCESSABLE_ENTITY,
                'Please try again after some time'
              )
            );
        }
      } catch (e) {
        logger.error(
          __dirname,
          'Error ocurred in addNewUser of UserController',
          'POST',
          e
        );
        let errors;

        if (e.errors) {
          errors = e.errors.map((item) => item.message);
        }
        errors = errors || e.message;
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
        if (dbResult && dbResult.getDataValue('password')) {
          let pass = dbResult.getDataValue('password');
          let matchPassword = await HashMan.compare(password, pass);
          if (matchPassword) {
            let accessToken = await JWT.signToken({
              userId: dbResult.getDataValue('id'),
              issuer: 'auth-app',
            });
            let refreshToken = await JWT.signToken({
              userId: dbResult.getDataValue('id'),
            });
            res.status(StatusCodes.OK).json(
              ResponseFormatter.getSuccessResponse(true, {
                accessToken,
                refreshToken,
              })
            );
          } else {
            res.status(StatusCodes.UNAUTHORIZED).json(
              ResponseFormatter.getSuccessResponse(true, {
                message: 'Please enter valid email/password',
              })
            );
          }
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json(
            ResponseFormatter.getSuccessResponse(true, {
              message: 'Please enter valid email/password',
            })
          );
        }
      } catch (e) {
        logger.error(
          __dirname,
          'Error ocurred in signIn of UserController',
          'POST',
          e
        );
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
