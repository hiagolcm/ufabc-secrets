import { Router } from 'express';
import ReviewController from '../controllers/ReviewController';

const reviewsRoutes = Router();
const reviewController = new ReviewController();

reviewsRoutes.post('/:secretId', reviewController.create);

export default reviewsRoutes;
