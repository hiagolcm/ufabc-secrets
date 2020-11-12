import fs from 'fs';
import mime from 'mime';
import path from 'path';
import aws from 'aws-sdk';
import StorageProviderInterface from '../StorageProviderInterface';
import { tmpFile } from '../../../../../configs/multerConfig';

export default class S3StorageProvider implements StorageProviderInterface {
  private client: aws.S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(tmpFile, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: process.env.BUCKET_NAME!,
        Key: file,
        Body: fileContent,
        ACL: 'public-read',
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }
}
