import { Router } from 'express';
import multer from 'multer';
import { multerConfig } from '../../../../../configs/multerConfig';
import authenticateUserMiddleware from '../../../../../shared/infra/middlewares/AuthenticateUserMiddleware';
import SecretsController from '../controllers/SecretsController';

const secretsRoutes = Router();
const secretsController = new SecretsController();

secretsRoutes.post('/', secretsController.craete);
secretsRoutes.post(
  '/upload',
  multer(multerConfig).array('medias', 4),
  secretsController.uploadMedias,
);
secretsRoutes.get('/status/:id', secretsController.checkStatus);
secretsRoutes.get(
  '/next',
  authenticateUserMiddleware,
  secretsController.getNextToReview,
);

export default secretsRoutes;
