import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AUTH_COOKIE_NAME } from '../../constants';
import AppError from '../../errors/AppError';

const authenticateUserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    new AppError(`Missing ${AUTH_COOKIE_NAME} cookie`);
  }

  try {
    const { sub } = verify(token, process.env.JWT_KEY!) as any;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};

export default authenticateUserMiddleware;
