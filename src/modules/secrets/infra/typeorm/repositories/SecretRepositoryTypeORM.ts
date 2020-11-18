import BaseRepositoryTypeORM from '../../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import SecretRepositoryInterface from '../../../repositories/SecretRepositoryInterface';
import SecretInterface from '../../../SecretInterface';
import SecretTypeORM from '../entities/SecreTypeORM';

class SecretRepositoryTypeORM
  extends BaseRepositoryTypeORM<SecretInterface>
  implements SecretRepositoryInterface {
  constructor() {
    super(SecretTypeORM);
  }

  public findById(id: number): Promise<SecretInterface | undefined> {
    return this.ormRepository.findOne({ id });
  }
}

export default SecretRepositoryTypeORM;
