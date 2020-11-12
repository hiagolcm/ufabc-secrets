import SecretInterface from '../../SecretInterface';
import SecretRepositoryInterface from '../SecretRepositoryInterface';
import BaseRepositoryFake from '../../../../shared/repositories/BaseRepositoryFake';
import { SecretStatusName } from '../../../../shared/types';
import { SECRETE_REVIEW_LIMIT_TIME_MS } from '../../../../shared/constants';

class SecretRepositoryFake
  extends BaseRepositoryFake<SecretInterface>
  implements SecretRepositoryInterface {
  getNextSecretToReview(): Promise<SecretInterface | undefined> {
    return new Promise((resolve) => {
      const now = new Date();

      resolve(
        this.items.find(
          (item) =>
            item.status === SecretStatusName.Pending &&
            new Date(now.getTime() - SECRETE_REVIEW_LIMIT_TIME_MS) >=
              item.updatedAt,
        ),
      );
    });
  }
}

export default SecretRepositoryFake;
