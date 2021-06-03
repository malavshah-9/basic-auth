import { Router } from 'express';

import userController from '../models/user.model';
import Validator from './user.validation';

const userRoute = Router();

userRoute.post(
  '/auth/signup',
  Validator.validateUser,
  userController.addNewUser
);

userRoute.post('/auth/signin', Validator.validateUser, userController.signIn);

export default userRoute;
