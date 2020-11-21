import { inject, injectable } from 'tsyringe';
import joi from 'joi';
import AppError from '../../../shared/errors/AppError';
import SecretRepositoryInterface from '../../secrets/repositories/SecretRepositoryInterface';
import UserRepositoryInterface from '../../users/repositories/UserRepositoryInterface';
import CreateReviewDTO from '../dtos/CreateReviewDTO';
import ReviewRepositoryInterface from '../repositories/ReviewRepositoryInterface';
import { ReviewResult, SecretStatusName } from '../../../shared/types';

const createReviewDTO = joi.object({
  userId: joi.string(),
  secretId: joi.number().integer().positive(),
  result: joi.string().valid(...Object.values(ReviewResult)),
});

@injectable()
class CreateReviewService {
  constructor(
    @inject('ReviewRepository')
    private reviewRepository: ReviewRepositoryInterface,
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
  ) {}

  public async execute({ userId, secretId, result }: CreateReviewDTO) {
    try {
      joi.assert({ userId, secretId, result }, createReviewDTO);
    } catch (e) {
      throw new AppError(e.details[0].message);
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User doesn't exist");
    }

    const secret = await this.secretRepository.findById(secretId);

    if (!secret) {
      throw new AppError("Secret doesn't exist");
    }

    if (secret.status !== SecretStatusName.Pending) {
      throw new AppError('This secret has already been revised');
    }

    const review = this.reviewRepository.create({
      result,
      secret: { id: secretId },
      user: { id: userId },
    });

    secret.status =
      result === ReviewResult.Accepted
        ? SecretStatusName.PublishPending
        : SecretStatusName.Denied;

    // TODO: add to the queue

    this.secretRepository.save(secret);

    return this.reviewRepository.save(review);
  }
}

export default CreateReviewService;
