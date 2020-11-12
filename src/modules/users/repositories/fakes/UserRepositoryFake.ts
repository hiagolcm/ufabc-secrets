import BaseRepositoryFake from '../../../../shared/repositories/BaseRepositoryFake';
import UserInterface from '../../UserInterface';
import UserRepositoryInterface from '../UserRepositoryInterface';

class UserRepositoryFake
  extends BaseRepositoryFake<UserInterface>
  implements UserRepositoryInterface {
  findByEmail(email: string): Promise<UserInterface | undefined> {
    return new Promise((resolver) => {
      resolver(this.items.find((item) => item.email === email));
    });
  }
}

export default UserRepositoryFake;
