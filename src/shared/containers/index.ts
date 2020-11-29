import { container } from 'tsyringe';
import ReviewRepositoryTypeORM from '../../modules/reviews/infra/repositories/ReviewRepositoryTypeORM';
import ReviewRepositoryInterface from '../../modules/reviews/repositories/ReviewRepositoryInterface';
import MediaRepositoryTypeORM from '../../modules/secrets/infra/typeorm/repositories/MediaRepositoryTypeORM';
import SecretRepositoryTypeORM from '../../modules/secrets/infra/typeorm/repositories/SecretRepositoryTypeORM';
import MediaRepositoryInterface from '../../modules/secrets/repositories/MediaRepository';
import SecretRepositoryInterface from '../../modules/secrets/repositories/SecretRepositoryInterface';
import UserRepositoryTypeORM from '../../modules/users/infra/typeorm/repositories/UserRepositoryTypeORM';
import UserRepositoryInterface from '../../modules/users/repositories/UserRepositoryInterface';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';
import StorageProviderInterface from './providers/StorageProvider/StorageProviderInterface';

const isProduction = process.env.NODE_ENV === 'production';

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

container.registerSingleton<MediaRepositoryInterface>(
  'MediaRepository',
  MediaRepositoryTypeORM,
);

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  isProduction ? S3StorageProvider : DiskStorageProvider,
);
