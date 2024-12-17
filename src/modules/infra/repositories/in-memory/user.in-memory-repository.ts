import { User } from '@modules/domain/entities';
import { UserRepository } from '@modules/domain/repositories';
import { BaseInMemoryRepository } from './base.in-memory-repository';

export class UserInMemoryRepository extends BaseInMemoryRepository<User> implements UserRepository {}
