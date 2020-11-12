import 'reflect-metadata';
import 'dotenv/config';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';

let userRepositoryFake = new UserRepositoryFake();

describe('AuthenticateUser', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
  });

  it('should be able to authenticate an user with valid credentials', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);
    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
    );

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto);

    await authenticateUserService.execute({
      email: dto.email,
      password: dto.password,
    });
  });

  it('should throw an error when the password is invalid', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);
    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
    );

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto);

    await expect(
      authenticateUserService.execute({
        email: dto.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error when the email is invalid', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);
    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
    );

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto);

    await expect(
      authenticateUserService.execute({
        email: 'janedoe@test.com',
        password: dto.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
