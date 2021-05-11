import { Router } from 'express';

import userController from '../../components/user/user.controller';

const userRoute = Router();

userRoute.post('/signup', userController.addNewUser);

export default userRoute;
