import StorageProviderInterface from '../../StorageProviderInterface';

class StorageProviderFake implements StorageProviderInterface {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }
}

export default StorageProviderFake;
