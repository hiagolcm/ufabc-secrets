import { inject, injectable } from 'tsyringe';
import joi from 'joi';
import { SecretStatusName } from '../../../shared/types';
import CreateSecretDTO from '../dtos/CreateSecretDTO';
import SecretRepositoryInterface from '../repositories/SecretRepositoryInterface';
import SecretInterface from '../SecretInterface';
import { MAX_SECRET_LENGTH } from '../../../shared/constants';
import AppError from '../../../shared/errors/AppError';
import MediaRepositoryInterface from '../repositories/MediaRepository';

const createSecretDtoSchema = joi.object({
  message: joi.string().min(1).max(MAX_SECRET_LENGTH).required(),
});

@injectable()
class CreateSecretService {
  constructor(
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
    @inject('MediaRepository')
    private mediaRepository: MediaRepositoryInterface,
  ) {}

  public async execute({
    message,
    mediaIds,
  }: CreateSecretDTO): Promise<SecretInterface> {
    const medias = await this.mediaRepository.findByIds(mediaIds);

    if (medias.length !== mediaIds.length) {
      throw new AppError('Some of the medias was not found');
    }

    medias.forEach((media) => {
      const { expiresAt } = media;

      if (!expiresAt) {
        throw new AppError(`The media ${media.id} has already been used`);
      }

      if (expiresAt <= new Date()) {
        throw new AppError(`The media ${media.id} expired`);
      }

      media.expiresAt = null;
    });

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
