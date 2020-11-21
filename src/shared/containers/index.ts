import { container } from 'tsyringe';
import ReviewRepositoryTypeORM from '../../modules/reviews/infra/repositories/ReviewRepositoryTypeORM';
import ReviewRepositoryInterface from '../../modules/reviews/repositories/ReviewRepositoryInterface';
import SecretRepositoryTypeORM from '../../modules/secrets/infra/typeorm/repositories/SecretRepositoryTypeORM';
import SecretRepositoryInterface from '../../modules/secrets/repositories/SecretRepositoryInterface';
import UserRepositoryTypeORM from '../../modules/users/infra/typeorm/repositories/UserRepositoryTypeORM';
import UserRepositoryInterface from '../../modules/users/repositories/UserRepositoryInterface';

container.registerSingleton<SecretRepositoryInterface>(
  'SecretRepository',
  SecretRepositoryTypeORM,
);

container.registerSingleton<UserRepositoryInterface>(
  'UserRepository',
  UserRepositoryTypeORM,
);

container.registerSingleton<ReviewRepositoryInterface>(
  'ReviewRepository',
  ReviewRepositoryTypeORM,
);
