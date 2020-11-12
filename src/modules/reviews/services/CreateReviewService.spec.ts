import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import { ReviewResult, SecretStatusName } from '../../../shared/types';
import SecretRepositoryFake from '../../secrets/repositories/fakes/SecretRepositoryFake';
import UserRepositoryFake from '../../users/repositories/fakes/UserRepositoryFake';
import ReviewRepositoryFake from '../repositories/fakes/ReviewRepositoryFake';
import CreateReviewService from './CreateReviewService';

let secretRepositoryFake = new SecretRepositoryFake();
let userRepositoryFake = new UserRepositoryFake();
let reviewRepositoryFake = new ReviewRepositoryFake();

describe('CreateReviewService', () => {
  beforeEach(() => {
    secretRepositoryFake = new SecretRepositoryFake();
    userRepositoryFake = new UserRepositoryFake();
    reviewRepositoryFake = new ReviewRepositoryFake();
  });

  it('should be able to create a valid review with accepted result and change secret status to PUBLISH_PENDING', async () => {
    const user = {
      id: '123',
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepositoryFake.items.push(user);

    const secret = {
      id: 123,
      message: 'My secret',
      status: SecretStatusName.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    secretRepositoryFake.items.push(secret);

    const createReviewService = new CreateReviewService(
      reviewRepositoryFake,
      userRepositoryFake,
      secretRepositoryFake,
    );

    const review = await createReviewService.execute({
      userId: user.id,
      secretId: secret.id,
      result: ReviewResult.Accepted,
    });

    const savedReview = await reviewRepositoryFake.findById(review.id);
    expect(savedReview).toBeDefined();

    const updatedSecret = await secretRepositoryFake.findById(secret.id);
    expect(updatedSecret.status).toBe(SecretStatusName.PublishPending);
  });

  it('should be able to create a valid review with denied result and change secret status to Denied', async () => {
    const user = {
      id: '123',
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepositoryFake.items.push(user);

    const secret = {
      id: 123,
      message: 'My secret',
      status: SecretStatusName.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    secretRepositoryFake.items.push(secret);

    const createReviewService = new CreateReviewService(
      reviewRepositoryFake,
      userRepositoryFake,
      secretRepositoryFake,
    );

    const review = await createReviewService.execute({
      userId: user.id,
      secretId: secret.id,
      result: ReviewResult.Denied,
    });

    const savedReview = await reviewRepositoryFake.findById(review.id);
    expect(savedReview).toBeDefined();

    const updatedSecret = await secretRepositoryFake.findById(secret.id);
    expect(updatedSecret.status).toBe(SecretStatusName.Denied);
  });

  it("should throw an error if the user doesn't exist", async () => {
    const secret = {
      id: 123,
      message: 'My secret',
      status: SecretStatusName.Pending,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    secretRepositoryFake.items.push(secret);

    const createReviewService = new CreateReviewService(
      reviewRepositoryFake,
      userRepositoryFake,
      secretRepositoryFake,
    );

    await expect(
      createReviewService.execute({
        userId: '123',
        secretId: secret.id,
        result: ReviewResult.Denied,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should throw an error if the secret doesn't exist", async () => {
    const user = {
      id: '123',
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepositoryFake.items.push(user);

    const createReviewService = new CreateReviewService(
      reviewRepositoryFake,
      userRepositoryFake,
      secretRepositoryFake,
    );

    await expect(
      createReviewService.execute({
        userId: user.id,
        secretId: 123,
        result: ReviewResult.Denied,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if the secret has already been revised', async () => {
    const user = {
      id: '123',
      email: 'johndoe@test.com',
      name: 'John Doe',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    userRepositoryFake.items.push(user);

    const secret = {
      id: 123,
      message: 'My secret',
      status: SecretStatusName.Denied,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    secretRepositoryFake.items.push(secret);

    const createReviewService = new CreateReviewService(
      reviewRepositoryFake,
      userRepositoryFake,
      secretRepositoryFake,
    );

    await expect(
      createReviewService.execute({
        userId: user.id,
        secretId: secret.id,
        result: ReviewResult.Accepted,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
