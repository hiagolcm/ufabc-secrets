import fs from 'fs';
import { resolve } from 'path';
import { tmpFile } from '../../../../../configs/multerConfig';
import StorageProviderInterface from '../StorageProviderInterface';

export default class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(tmpFile, file),
      resolve(tmpFile, 'uploads', file),
    );

    return file;
  }
}
