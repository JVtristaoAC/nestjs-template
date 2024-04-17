import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersRepositoryInMemory implements UsersRepository {
  usersMemory: User[] = [];

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = {
      id: randomUUID(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.usersMemory.push(createdUser);

    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.usersMemory;
  }
}
