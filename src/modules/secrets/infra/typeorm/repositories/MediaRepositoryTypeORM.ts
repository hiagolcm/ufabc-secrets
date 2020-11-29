import BaseRepositoryTypeORM from '../../../../../shared/infra/typeorm/repositories/BaseRepositoryTypeORM';
import MediaInterface from '../../../MediaInterface';
import MediaRepositoryInterface from '../../../repositories/MediaRepository';
import MediaTypeORM from '../entities/MediaTypeORM';

class MediaRepositoryTypeORM
  extends BaseRepositoryTypeORM<MediaInterface>
  implements MediaRepositoryInterface {
  constructor() {
    super(MediaTypeORM);
  }
}

export default MediaRepositoryTypeORM;
