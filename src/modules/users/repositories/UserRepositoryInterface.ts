import BaseRepositoryInterface from '../../../shared/repositories/BaseRepositoryInterface';
import UserInterface from '../UserInterface';

interface UserRepositoryInterface
  extends BaseRepositoryInterface<UserInterface> {
  findByEmail(email: string): Promise<UserInterface | undefined>;
}

export default UserRepositoryInterface;
