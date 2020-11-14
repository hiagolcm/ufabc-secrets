import { inject, injectable } from 'tsyringe';
import joi from 'joi';
import { SecretStatusName } from '../../../shared/types';
import CreateSecretDTO from '../dtos/CreateSecretDTO';
import SecretRepositoryInterface from '../repositories/SecretRepositoryInterface';
import SecretInterface from '../SecretInterface';
import { MAX_SECRET_LENGTH } from '../../../shared/constants';
import AppError from '../../../shared/errors/AppError';

const createSecretDtoSchema = joi.object({
  message: joi.string().min(1).max(MAX_SECRET_LENGTH).required(),
});

@injectable()
class CreateSecretService {
  constructor(
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
  ) {}

  public async execute({
    message,
    imageURL,
  }: CreateSecretDTO): Promise<SecretInterface> {
    const newSecret = this.secretRepository.create({ message, imageURL });

    // Since imageURL is filled by the server, it doesn't require validation
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
