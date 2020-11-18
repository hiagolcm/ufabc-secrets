import BaseRepositoryInterface from '../../../shared/repositories/BaseRepositoryInterface';
import SecretInterface from '../SecretInterface';

interface SecretRepositoryInterface
  extends BaseRepositoryInterface<SecretInterface> {
  findById(id: number): Promise<SecretInterface | undefined>;
}

export default SecretRepositoryInterface;
