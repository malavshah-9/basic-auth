import status from 'http-status-codes';

import user from './user.model';
import JWT from '../../services/JWTGenerator.service';
import ResponseFormatter from '../../util/ResponseFormatter';

class UserController {
  constructor() {}
  async addNewUser(req, res, next) {
    let email, password;
    email = req.body.email;
    password = req.body.password;
    if (email && password) {
      try {
        let dbResult = await user.create({
          email,
          password,
        });
        let token = await JWT.signToken({
          userId: dbResult.getDataValue('id'),
        });
        return res.status(status.OK).json(
          ResponseFormatter.getSuccessResponse(true, {
            accessToken: token,
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
}
export default new UserController();
