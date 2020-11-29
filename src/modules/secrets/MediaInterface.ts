interface MediaInterface {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
}

export default MediaInterface;
