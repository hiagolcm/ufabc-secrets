import { SecretStatusName } from '../../shared/types';

interface SecretInterface {
  id: number;
  message: string;
  imageURL?: string;
  status: SecretStatusName;
  createdAt: Date;
  updatedAt: Date;
}

export default SecretInterface;
