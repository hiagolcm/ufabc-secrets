import { SecretStatusName } from '../../shared/types';
import MediaInterface from './MediaInterface';

interface SecretInterface {
  id: number;
  message: string;
  medias?: MediaInterface[];
  status: SecretStatusName;
  lastReviewRequiest?: Date;
  createdAt: Date;
  updatedAt: Date;
  getUrls: () => string[];
}

export default SecretInterface;
