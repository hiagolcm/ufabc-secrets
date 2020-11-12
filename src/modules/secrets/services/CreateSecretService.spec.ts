import 'reflect-metadata';
import { MAX_SECRET_LENGTH } from '../../../shared/constants';
import StorageProviderFake from '../../../shared/containers/providers/StorageProvider/implementations/fakes/StorageProviderFake';
import AppError from '../../../shared/errors/AppError';
import { SecretStatusName } from '../../../shared/types';
import CreateSecretDTO from '../dtos/CreateSecretDTO';
import SecretRepositoryFake from '../repositories/fakes/SecretRepositoryFake';
import CreateSecretService from './CreateSecretService';

let secretRepositoryFake = new SecretRepositoryFake();
let storageProviderFake = new StorageProviderFake();

describe('CreateSecret', () => {
  beforeEach(() => {
    secretRepositoryFake = new SecretRepositoryFake();
  });

  it('should be able to create a new valid secret', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      storageProviderFake,
    );

    const dto: CreateSecretDTO = {
      message: 'x'.repeat(MAX_SECRET_LENGTH),
      imageNames: ['image.jpg'],
    };

    const secret = await createSecretService.execute(dto);

    expect(secret.message).toBe(dto.message);
    expect(secret.images![0].name).toBe(dto.imageNames[0]);
    expect(secret.status).toBe(SecretStatusName.Pending);

    const secrets = await secretRepositoryFake.index();

    expect(secrets.length).toBe(1);
  });

  it('should throw an error if the message exceeds the MAX_SECRET_LENGTH', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      storageProviderFake,
    );

    const dto = {
      message: 'x'.repeat(MAX_SECRET_LENGTH + 1),
      imageNames: [],
    };

    await expect(createSecretService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should throw an error if the message is empty', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      storageProviderFake,
    );

    const dto = {
      message: '',
      imageNames: [],
    };

    await expect(createSecretService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
