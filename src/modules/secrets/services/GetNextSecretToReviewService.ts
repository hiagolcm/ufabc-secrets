import { inject, injectable } from 'tsyringe';
import SecretRepositoryInterface from '../repositories/SecretRepositoryInterface';
import SecretInterface from '../SecretInterface';

@injectable()
class GetNextSecretToReviewService {
  constructor(
    @inject('SecretRepository')
    private secretRepository: SecretRepositoryInterface,
  ) {}

  public async execute(): Promise<SecretInterface | undefined> {
    return this.secretRepository.getNextSecretToReview();
  }
}

export default GetNextSecretToReviewService;
