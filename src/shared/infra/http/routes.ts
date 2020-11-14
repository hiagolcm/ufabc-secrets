import { Router } from 'express';
import secretsRoutes from '../../../modules/secrets/infra/http/routes/secrets.routes';

const routes = Router();

routes.use('/secrets', secretsRoutes);

export default routes;
