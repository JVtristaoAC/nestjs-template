import { User } from '@domain/entities';
import { IBaseRepository } from './base.repository';

export interface UserRepository extends IBaseRepository<User> {}
