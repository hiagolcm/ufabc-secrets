interface StorageProviderInterface {
  saveFile(file: string): Promise<string>;
}

export default StorageProviderInterface;
