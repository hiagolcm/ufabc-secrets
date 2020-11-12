import { SecretStatusName } from '../../shared/types';
import ImageInterface from './ImageInterface';

interface SecretInterface {
  id: number;
  message: string;
  images?: ImageInterface[];
  status: SecretStatusName;
  lastReviewRequiest?: Date;
  createdAt: Date;
  updatedAt: Date;
  getUrls: () => string[];
}

export default SecretInterface;
