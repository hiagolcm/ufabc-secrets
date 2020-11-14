import SecretStatusInterface from './SecretStatusInterface';

interface SecretInterface {
  id: number;
  message: string;
  imageUrl: string;
  status?: SecretStatusInterface;
  createdAt: Date;
  updatedAt: Date;
}

export default SecretInterface;
