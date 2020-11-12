import { ReviewResult } from '../../shared/types';
import SecretInterface from '../secrets/SecretInterface';
import UserInterface from '../users/UserInterface';

interface ReviewInterface {
  id: number;
  user: UserInterface;
  secret: SecretInterface;
  result: ReviewResult;
  createdAt: Date;
  updatedAt: Date;
}

export default ReviewInterface;
