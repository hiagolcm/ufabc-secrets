import { Router } from 'express';
import SecretsController from '../controllers/SecretsController';

const secretsRoutes = Router();
const secretsController = new SecretsController();

secretsRoutes.post('/', secretsController.craete);
secretsRoutes.get('/status/:id', secretsController.checkStatus);

export default secretsRoutes;
