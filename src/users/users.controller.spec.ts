import { Test, TestingModule } from '@nestjs/testing';
import { UsersFactory } from './factories/users.factory';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersRepositoryInMemory } from './repositories/users.repository.in-memory';
import { UsersService } from './users.service';

describe('users controller', () => {
  let usersController: UsersController;
  let usersFactory: UsersFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersRepository,
          useClass: UsersRepositoryInMemory,
        },
        UsersService,
        UsersFactory,
      ],
    }).compile();

    usersController = module.get(UsersController);
    usersFactory = module.get(UsersFactory);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should return all users', async () => {
    const users = await usersController.findAll();

    expect(users).toBeInstanceOf(Array);
  });

  it('should create a user', async () => {
    const user = await usersController.create(usersFactory.make());

    expect(user).toHaveProperty('id');
  });
});
