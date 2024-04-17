import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export abstract class UsersRepository {
  abstract create(user: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
