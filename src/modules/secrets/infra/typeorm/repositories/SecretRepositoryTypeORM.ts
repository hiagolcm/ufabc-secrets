import { getRepository, Repository } from 'typeorm';
import SecretRepositoryInterface from '../../../repositories/SecretRepositoryInterface';
import SecretInterface from '../../../SecretInterface';
import SecretTypeORM from '../entities/SecreTypeORM';

class SecretRepositoryTypeORM implements SecretRepositoryInterface {
  private ormRepository: Repository<SecretTypeORM>;

  constructor() {
    this.ormRepository = getRepository(SecretTypeORM);
  }

  public create(partialSecret: Partial<SecretInterface>) {
    return this.ormRepository.create(partialSecret);
  }

  public save(secret: SecretInterface) {
    return this.ormRepository.save(secret);
  }

  public index() {
    return this.ormRepository.find();
  }
}

export default SecretRepositoryTypeORM;
