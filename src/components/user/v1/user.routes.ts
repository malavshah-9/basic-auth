import { Router } from 'express';

import userController from '../models/user.model';

const userRoute = Router();

userRoute.post('/auth/signup', userController.addNewUser);

userRoute.post('/auth/signin', userController.signIn);

export default userRoute;
