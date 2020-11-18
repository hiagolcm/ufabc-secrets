import BaseRepositoryTypeORM from '../../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import UserRepositoryInterface from '../../../repositories/UserRepositoryInterface';
import UserInterface from '../../../UserInterface';
import UserTypeORM from '../entities/UserTypeORM';

class UserRepositoryTypeORM
  extends BaseRepositoryTypeORM<UserInterface>
  implements UserRepositoryInterface {
  constructor() {
    super(UserTypeORM);
  }

  findByEmail(email: string): Promise<UserInterface | undefined> {
    return this.ormRepository.findOne({ email });
  }
}

export default UserRepositoryTypeORM;
