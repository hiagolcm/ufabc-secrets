import 'reflect-metadata';
import { MAX_SECRET_LENGTH } from '../../../shared/constants';
import AppError from '../../../shared/errors/AppError';
import { SecretStatusName } from '../../../shared/types';
import CreateSecretDTO from '../dtos/CreateSecretDTO';
import MediaRepositoryFake from '../repositories/fakes/MediaRepositoryFake';
import SecretRepositoryFake from '../repositories/fakes/SecretRepositoryFake';
import CreateSecretService from './CreateSecretService';

let secretRepositoryFake = new SecretRepositoryFake();
let mediaRepositoryFake = new MediaRepositoryFake();

describe('CreateSecret', () => {
  beforeEach(() => {
    secretRepositoryFake = new SecretRepositoryFake();
  });

  it('should be able to create a new valid secret', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      mediaRepositoryFake,
    );

    const dto: CreateSecretDTO = {
      message: 'x'.repeat(MAX_SECRET_LENGTH),
      mediaIds: [],
    };

    const secret = await createSecretService.execute(dto);

    expect(secret.message).toBe(dto.message);
    expect(secret.status).toBe(SecretStatusName.Pending);

    const secrets = await secretRepositoryFake.index();

    expect(secrets.length).toBe(1);
  });

  it('should throw an error if the message exceeds the MAX_SECRET_LENGTH', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      mediaRepositoryFake,
    );

    const dto = {
      message: 'x'.repeat(MAX_SECRET_LENGTH + 1),
      mediaIds: [],
    };

    await expect(createSecretService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should throw an error if the message is empty', async () => {
    const createSecretService = new CreateSecretService(
      secretRepositoryFake,
      mediaRepositoryFake,
    );

    const dto = {
      message: '',
      mediaIds: [],
    };

    await expect(createSecretService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
