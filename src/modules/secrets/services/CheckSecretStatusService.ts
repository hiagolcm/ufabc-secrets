import joi from 'joi';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import CheckSecretStatusDTO from '../dtos/CheckSecretStatusDTO';
import SecretRepositoryInterface from '../repositories/SecretRepositoryInterface';

const checkSecretStatusDTOSchema = joi.object({
  secretId: joi.number().integer().required(),
});

@injectable()
class CheckSecretStatusService {
  constructor(
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
  ) {}

  public async execute({ secretId }: CheckSecretStatusDTO) {
    try {
      joi.assert({ secretId }, checkSecretStatusDTOSchema);
    } catch (e) {
      throw new AppError(e.details[0].message);
    }

    const secret = await this.secretRepository.findById(secretId);

    if (!secret) {
      throw new AppError('Secret not found');
    }

    return secret.status;
  }
}

export default CheckSecretStatusService;
