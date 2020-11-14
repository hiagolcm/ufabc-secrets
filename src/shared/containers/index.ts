import { container } from 'tsyringe';
import SecretRepositoryTypeORM from '../../modules/secrets/infra/typeorm/repositories/SecretRepositoryTypeORM';
import SecretRepositoryInterface from '../../modules/secrets/repositories/SecretRepositoryInterface';

container.registerSingleton<SecretRepositoryInterface>(
  'SecretRepository',
  SecretRepositoryTypeORM,
);
