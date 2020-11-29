import BaseRepositoryFake from '../../../../shared/repositories/BaseRepositoryFake';
import MediaInterface from '../../MediaInterface';
import MediaRepositoryInterface from '../MediaRepository';

class MediaRepositoryFake
  extends BaseRepositoryFake<MediaInterface>
  implements MediaRepositoryInterface {}

export default MediaRepositoryFake;
