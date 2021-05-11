import status from 'http-status-codes';

import user from './user.model';
import ResponseFormatter from '../../util/ResponseFormatter';

class UserController {
  constructor() {}
  async addNewUser(req, res, next) {
    let email, password;
    email = req.body.email;
    password = req.body.password;
    if (email && password) {
      try {
        let dbResult = user.create({
          email,
          password,
        });
        return res.status(status.OK).json(
          ResponseFormatter.getSuccessResponse(true, {
            ...dbResult,
          })
        );
      } catch (e) {
        throw e;
      }
    } else {
      throw new Error(' Please enter valid body');
    }
  }
}
export default new UserController();
