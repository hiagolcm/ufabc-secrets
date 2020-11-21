import BaseRepositoryTypeORM from '../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import ReviewInterface from '../../ReviewInterface';
import ReviewReposityrInterface from '../../repositories/ReviewRepositoryInterface';

class ReviewRepositoryTypeORM
  extends BaseRepositoryTypeORM<ReviewInterface>
  implements ReviewReposityrInterface {}

export default ReviewRepositoryTypeORM;
