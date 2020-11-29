import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import { SecretStatusName } from '../../../shared/types';
import MediaRepositoryFake from '../repositories/fakes/MediaRepositoryFake';
import SecretRepositoryFake from '../repositories/fakes/SecretRepositoryFake';
import CheckSecretStatusService from './CheckSecretStatusService';
import CreateSecretService from './CreateSecretService';

let secretRepositoryFake = new SecretRepositoryFake();
const mediaRepositoryFake = new MediaRepositoryFake();

describe('CheckSecretStatus', () => {
  beforeEach(() => {
    secretRepositoryFake = new SecretRepositoryFake();
  });

  it('should return the status of an existing secret', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      mediaRepositoryFake,
    );
    const checkSecretStatusService = new CheckSecretStatusService(
      secretRepositoryFake,
    );

    const dto = {
      message: 'my secret.',
      mediaIds: [],
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
