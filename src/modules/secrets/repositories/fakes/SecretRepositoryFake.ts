import SecretInterface from '../../SecretInterface';
import SecretRepositoryInterface from '../SecretRepositoryInterface';
import BaseRepositoryFake from '../../../../shared/repositories/BaseRepositoryFake';

class SecretRepositoryFake
  extends BaseRepositoryFake<SecretInterface>
  implements SecretRepositoryInterface {
  findById(id: number): Promise<SecretInterface | undefined> {
    return new Promise((resolve) => {
      resolve(this.items.find((item) => item.id === id));
    });
  }
}

export default SecretRepositoryFake;
