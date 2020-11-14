import SecretInterface from '../../SecretInterface';
import SecretRepositoryInterface from '../SecretRepositoryInterface';
import BaseRepositoryFake from './BaseRepositoryFake';

class SecretRepositoryFake
  extends BaseRepositoryFake<SecretInterface>
  implements SecretRepositoryInterface {}

export default SecretRepositoryFake;
