import BaseRepositoryInterface from '../../../shared/repositories/BaseRepositoryInterface';
import SecretInterface from '../SecretInterface';

interface SecretRepositoryInterface
  extends BaseRepositoryInterface<SecretInterface> {
  getNextSecretToReview(
    transactionManager?: unknown,
  ): Promise<SecretInterface | undefined>;
}

export default SecretRepositoryInterface;
