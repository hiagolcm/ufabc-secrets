import {
  EntityManager,
  LessThan,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { SECRETE_REVIEW_LIMIT_TIME_MS } from '../../../../../shared/constants';
import BaseRepositoryTypeORM from '../../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import { SecretStatusName } from '../../../../../shared/types';
import SecretRepositoryInterface from '../../../repositories/SecretRepositoryInterface';
import SecretInterface from '../../../SecretInterface';
import SecretTypeORM from '../entities/SecreTypeORM';

class SecretRepositoryTypeORM
  extends BaseRepositoryTypeORM<SecretInterface>
  implements SecretRepositoryInterface {
  constructor() {
    super(SecretTypeORM);
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  public async getNextSecretToReview(
    @TransactionManager() manager: EntityManager,
  ): Promise<undefined | SecretTypeORM> {
    const now = new Date();
    const limit = new Date(now.getTime() - SECRETE_REVIEW_LIMIT_TIME_MS);

    const [secret] = await manager.find(SecretTypeORM, {
      where: [
        { status: SecretStatusName.Pending, lastReviewRequiest: null },
        {
          status: SecretStatusName.Pending,
          lastReviewRequiest: LessThan(limit),
        },
      ],
      relations: ['images'],
      order: { createdAt: 'ASC' },
      take: 1,
    });

    if (!secret) {
      return;
    }

    secret.lastReviewRequiest = new Date();

    await manager.save(secret);

    return secret;
  }
}

export default SecretRepositoryTypeORM;
