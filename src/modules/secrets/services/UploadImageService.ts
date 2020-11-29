import { inject, injectable } from 'tsyringe';
import { MEDIA_UPLOAD_EXPIRATION_MS } from '../../../shared/constants';
import StorageProviderInterface from '../../../shared/containers/providers/StorageProvider/StorageProviderInterface';
import UploadMediaDTO from '../dtos/UploadMediaDTO';
import MediaRepositoryInterface from '../repositories/MediaRepository';

@injectable()
class UploadMediaService {
  constructor(
    @inject('MediaRepository')
    private mediaRepository: MediaRepositoryInterface,
    @inject('StorageProvider')
    private storageProvider: StorageProviderInterface,
  ) {}

  public async execute({ mediaName: name }: UploadMediaDTO) {
    await this.storageProvider.saveFile(name);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + MEDIA_UPLOAD_EXPIRATION_MS);

    const media = this.mediaRepository.create({ name, expiresAt });

    return this.mediaRepository.save(media);
  }
}

export default UploadMediaService;
