import { inject, injectable } from 'tsyringe';
import joi from 'joi';
import { SecretStatusName } from '../../../shared/types';
import CreateSecretDTO from '../dtos/CreateSecretDTO';
import SecretRepositoryInterface from '../repositories/SecretRepositoryInterface';
import SecretInterface from '../SecretInterface';
import { MAX_SECRET_LENGTH } from '../../../shared/constants';
import AppError from '../../../shared/errors/AppError';
import StorageProviderInterface from '../../../shared/containers/providers/StorageProvider/StorageProviderInterface';
import { DeepPartial } from 'typeorm';
import MediaInterface from '../MediaInterface';

const createSecretDtoSchema = joi.object({
  message: joi.string().min(1).max(MAX_SECRET_LENGTH).required(),
});

@injectable()
class CreateSecretService {
  constructor(
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
    @inject('StorageProvider')
    private storageProvider: StorageProviderInterface,
  ) {}

  public async execute({
    message,
    mediaNames,
  }: CreateSecretDTO): Promise<SecretInterface> {
    const imageUploadPromises = mediaNames.map((name) =>
      this.storageProvider.saveFile(name),
    );

    await Promise.all(imageUploadPromises);

    const medias: DeepPartial<MediaInterface>[] = mediaNames.map((name) => ({
      name,
    }));

    const newSecret = this.secretRepository.create({ message, medias });

    try {
      joi.assert({ message }, createSecretDtoSchema);
    } catch (e) {
      throw new AppError(e.details[0].message);
    }

    newSecret.status = SecretStatusName.Pending;

    return this.secretRepository.save(newSecret);
  }
}

export default CreateSecretService;
