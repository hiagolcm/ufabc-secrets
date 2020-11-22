import { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/AppError';

const authenticateByMasterAPIKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKeyHeader = req.headers.authorization;

  if (!apiKeyHeader) {
    throw new AppError('Missing auth key');
  }

  if (apiKeyHeader !== process.env.MASTER_API_KEY) {
    throw new AppError('Wrong auth key');
  }

  next();
};

export default authenticateByMasterAPIKeyMiddleware;
