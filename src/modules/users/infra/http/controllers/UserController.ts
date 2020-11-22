import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_NAME,
} from '../../../../../shared/constants';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import CreateUserService from '../../../services/CreateUserService';

class UserController {
  public async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateService = container.resolve(AuthenticateUserService);

    const { jwt, user } = await authenticateService.execute({
      email,
      password,
    });

    res.cookie(AUTH_COOKIE_NAME, jwt, {
      maxAge: AUTH_COOKIE_MAX_AGE,
      httpOnly: true,
    });

    res.json({ id: user.id, email: user.email, name: user.name });
  }

  public async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    res.json({ id: user.id, email: user.email, name: user.name });
  }
}

export default UserController;
