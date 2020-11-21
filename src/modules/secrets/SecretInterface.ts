import { SecretStatusName } from '../../shared/types';

interface SecretInterface {
  id: number;
  message: string;
  imageURL?: string;
  status: SecretStatusName;
  lastReviewRequiest?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default SecretInterface;
