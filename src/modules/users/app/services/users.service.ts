import { User } from '@modules/domain/entities/user.entity';
import { BaseRepository } from '@modules/infra/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/dtos/create-user.dto';
import { UpdateUserDto } from '../models/dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: BaseRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { id } = await this.usersRepository.create(User, { data: createUserDto, select: { id: true } });
    return id;
  }

  async findAll(): Promise<{ name: string, created_at: Date, }[]> {
    return await this.usersRepository.list(User, { where: {}, select: { name: true, created_at: true } });
  }

  async findOne(id: number) {
    return await this.usersRepository.get(User, { where: { id } });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(User, { data: { name: updateUserDto.name }, where: { id: updateUserDto.id } });
  }

  async delete(id: number) {
    return await this.usersRepository.delete(User, { where: { id } });
  }
}
