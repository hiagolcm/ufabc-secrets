import { ReviewResult } from '../../../shared/types';

interface CreateReviewDTO {
  userId: string;
  secretId: number;
  result: ReviewResult;
}

export default CreateReviewDTO;
