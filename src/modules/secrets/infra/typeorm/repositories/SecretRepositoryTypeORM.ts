import BaseRepositoryTypeORM from '../../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import SecretRepositoryInterface from '../../../repositories/SecretRepositoryInterface';
import SecretInterface from '../../../SecretInterface';

class SecretRepositoryTypeORM
  extends BaseRepositoryTypeORM<SecretInterface>
  implements SecretRepositoryInterface {}

export default SecretRepositoryTypeORM;
