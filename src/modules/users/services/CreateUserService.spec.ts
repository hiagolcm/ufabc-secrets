import 'reflect-metadata';
import bcrypt from 'bcrypt';
import AppError from '../../../shared/errors/AppError';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import CreateUserService from './CreateUserService';

jest.mock('bcrypt');

const mockedBCrypt = bcrypt as jest.Mocked<typeof bcrypt>;

let userRepositoryFake = new UserRepositoryFake();

describe('CreateUserService', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
  });

  it('should be able to create a valid user', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto);

    const user = await userRepositoryFake.findByEmail(dto.email);

    expect(user).toBeDefined();
  });

  it('should encrypt the password', async () => {
    const encryptedPassword = 'encrypted-pass';
    mockedBCrypt.hash.mockResolvedValue(encryptedPassword);

    const createUserService = new CreateUserService(userRepositoryFake);

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto);

    const user = await userRepositoryFake.findByEmail(dto.email);

    expect(user?.password).toBe(encryptedPassword);
  })

  it('should throw an error if the password is not safe', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);

    const dto = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    };

    await expect(createUserService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should throw an error if the email is not valid', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);

    const dto = {
      name: 'John Doe',
      email: 'johndoe',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await expect(createUserService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should throw an error if the name is not valid', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);

    const dto = {
      name: '',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    await expect(createUserService.execute(dto)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should throw an error if the email is already being used', async () => {
    const createUserService = new CreateUserService(userRepositoryFake);

    const dto_a = {
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'My_S3cR3t_P4ssW0rd',
    };

    const dto_b = {
      name: 'Jane Doe',
      email: 'johndoe@test.com',
      password: 'My_0th3r_S3cR3t_P4ssW0rd',
    };

    await createUserService.execute(dto_a);

    await expect(createUserService.execute(dto_b)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
