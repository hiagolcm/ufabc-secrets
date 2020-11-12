import { Router } from 'express';
import reviewsRoutes from '../../../modules/reviews/infra/http/routes/review.routes';
import secretsRoutes from '../../../modules/secrets/infra/http/routes/secrets.routes';
import usersRoutes from '../../../modules/users/infra/http/routes/users.routes';
import authenticateUserMiddleware from '../middlewares/AuthenticateUserMiddleware';

const routes = Router();

routes.use('/secrets', secretsRoutes);
routes.use('/users', usersRoutes);
routes.use('/reviews', authenticateUserMiddleware, reviewsRoutes);

export default routes;
