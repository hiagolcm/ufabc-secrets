import BaseRepositoryFake from '../../../../shared/repositories/BaseRepositoryFake';
import ReviewInterface from '../../ReviewInterface';
import ReviewRepositoryInterface from '../ReviewRepositoryInterface';

class ReviewRepositoryFake
  extends BaseRepositoryFake<ReviewInterface>
  implements ReviewRepositoryInterface {}

export default ReviewRepositoryFake;
