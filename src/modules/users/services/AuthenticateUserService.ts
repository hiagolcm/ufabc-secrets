import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import AuthenticateUserDTO from '../dtos/AuthenticateUserDTO';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({ email, password }: AuthenticateUserDTO) {
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
