import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateReviewService from '../../../services/CreateReviewService';

class ReviewController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { result } = req.body;
    const { secretId } = req.params;

    const createReviewService = container.resolve(CreateReviewService);

    const review = await createReviewService.execute({
      result,
      secretId: parseInt(secretId),
      userId: req.user.id,
    });

    return res.json(review);
  }
}

export default ReviewController;
