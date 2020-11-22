import BaseRepositoryTypeORM from '../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import ReviewInterface from '../../ReviewInterface';
import ReviewReposityrInterface from '../../repositories/ReviewRepositoryInterface';
import ReviewTypeORM from '../typeorm/entities/ReviewTypeORM';

class ReviewRepositoryTypeORM
  extends BaseRepositoryTypeORM<ReviewInterface>
  implements ReviewReposityrInterface {
  constructor() {
    super(ReviewTypeORM);
  }
}

export default ReviewRepositoryTypeORM;
