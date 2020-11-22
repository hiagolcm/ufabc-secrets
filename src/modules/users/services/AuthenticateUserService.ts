import { compare } from 'bcrypt';
import joi from 'joi';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import AuthenticateUserDTO from '../dtos/AuthenticateUserDTO';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

const authenticateUserDTOSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ email, password }: AuthenticateUserDTO) {
    try {
      joi.assert({ email, password }, authenticateUserDTOSchema);
    } catch (e) {
      throw new AppError(e.details[0].message);
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid Email/Password');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Invalid Email/Password');
    }

    const jwt = sign({}, process.env.JWT_KEY!, {
      subject: user.id.toString(),
      expiresIn: '1d',
    });

    return { jwt, user };
  }
}

export default AuthenticateUserService;
