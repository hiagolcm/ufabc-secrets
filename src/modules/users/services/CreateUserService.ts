import { inject } from 'tsyringe';
import { hash } from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import CreateUserDTO from '../dtos/CreateUserDTO';
import UserRepositoryInterface from '../repositories/UserRepositoryInterface';
import UserInterface from '../UserInterface';
import joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const createUserDTOSchema = joi.object({
  name: joi.string().min(5).max(255),
  email: joi.string().email(),
  password: passwordComplexity(),
});

class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepositoryInterface,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<UserInterface> {
    const userWithTheSameEmail = await this.userRepository.findByEmail(email);

    if (userWithTheSameEmail) {
      throw new AppError('Email already used.');
    }

    try {
      joi.assert({ name, email, password }, createUserDTOSchema);
    } catch (e) {
      throw new AppError(e.details[0].message);
    }

    const encodedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: encodedPassword,
    });

    return this.userRepository.save(user);
  }
}

export default CreateUserService;
