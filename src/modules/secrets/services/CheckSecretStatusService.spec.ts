import 'reflect-metadata';
import StorageProviderFake from '../../../shared/containers/providers/StorageProvider/implementations/fakes/StorageProviderFake';
import AppError from '../../../shared/errors/AppError';
import { SecretStatusName } from '../../../shared/types';
import SecretRepositoryFake from '../repositories/fakes/SecretRepositoryFake';
import CheckSecretStatusService from './CheckSecretStatusService';
import CreateSecretService from './CreateSecretService';

let secretRepositoryFake = new SecretRepositoryFake();
const storageProvider = new StorageProviderFake();

describe('CheckSecretStatus', () => {
  beforeEach(() => {
    secretRepositoryFake = new SecretRepositoryFake();
  });

  it('should return the status of an existing secret', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      storageProvider,
    );
    const checkSecretStatusService = new CheckSecretStatusService(
      secretRepositoryFake,
    );

    const dto = {
      message: 'my secret.',
      mediaNames: ['myImage.jpg'],
    };

    await createSecretService.execute(dto);

    const status = await checkSecretStatusService.execute({ secretId: 1 });

    expect(status).toBe(SecretStatusName.Pending);
  });

  it("should throw an error if the secret doesn't exist", async () => {
    const checkSecretStatusService = new CheckSecretStatusService(
      secretRepositoryFake,
    );

    await expect(
      checkSecretStatusService.execute({ secretId: 1 }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if the secretId is not a number', async () => {
    const checkSecretStatusService = new CheckSecretStatusService(
      secretRepositoryFake,
    );

    await expect(
      checkSecretStatusService.execute({ secretId: NaN }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
