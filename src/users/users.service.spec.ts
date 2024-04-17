import { Test } from '@nestjs/testing';
import { UsersFactory } from './factories/users.factory';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersRepositoryInMemory } from './repositories/users.repository.in-memory';

describe('users service', () => {
  let usersService: UsersService;
  let usersFactory: UsersFactory;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UsersRepository,
          useClass: UsersRepositoryInMemory,
        },
        UsersService,
        UsersFactory,
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersFactory = module.get(UsersFactory);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await usersService.create(usersFactory.make());

    expect(user).toHaveProperty('id');
  });

  it('should return all users', async () => {
    const users = await usersService.findAll();
    expect(users).toBeInstanceOf(Array);
  });
});
