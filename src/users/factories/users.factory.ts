import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersFactory {
  constructor(private userRepository: UsersRepository) {}

  make(): User {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();

    return {
      id: faker.string.uuid(),
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  }

  async create(): Promise<User> {
    const user = this.make();
    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}
