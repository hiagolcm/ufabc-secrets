import { Router } from 'express';
import authenticateByMasterAPIKeyMiddleware from '../../../../../shared/infra/middlewares/AuthenticateByMasterAPIKeyMiddleware';
import UserController from '../controllers/UserController';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post(
  '/',
  authenticateByMasterAPIKeyMiddleware,
  userController.createUser,
);
usersRoutes.post('/login', userController.authenticate);

export default usersRoutes;
