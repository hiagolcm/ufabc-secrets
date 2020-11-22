import { Router } from 'express';
import authenticateUserMiddleware from '../../../../../shared/infra/middlewares/AuthenticateUserMiddleware';
import SecretsController from '../controllers/SecretsController';

const secretsRoutes = Router();
const secretsController = new SecretsController();

secretsRoutes.post('/', secretsController.craete);
secretsRoutes.get('/status/:id', secretsController.checkStatus);
secretsRoutes.get(
  '/next',
  authenticateUserMiddleware,
  secretsController.getNextToReview,
);

export default secretsRoutes;
