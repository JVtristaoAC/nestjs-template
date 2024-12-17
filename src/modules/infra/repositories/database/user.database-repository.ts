import { User } from '@modules/domain/entities';
import { FilterNever, SelectedFields, SelectType, UserRepository } from '@modules/domain/repositories';
import { PrismaService } from './prisma.service';

export class UserDatabaseRepository implements UserRepository {
  constructor(private readonly context: PrismaService) {}

  async create<Selected extends Partial<SelectType<User>>>(
    args: { data: User, select?: Selected, },
  ): Promise<FilterNever<SelectedFields<User, Selected>> | null> {
    const entity = await this.context.user.create(args);
    return entity as unknown as FilterNever<SelectedFields<User, Selected>> ?? null;
  }

  async update(
    args: { where: User, data: Partial<User>, },
  ): Promise<void> {
    await this.context.user.update(args);
  }

  async delete(args: { where: User, }): Promise<void> {
    await this.context.user.delete(args);
  }

  async list<Selected extends Partial<SelectType<User>>>(
    args: { where: Partial<User>, select?: Selected, },
  ): Promise<FilterNever<SelectedFields<User, Selected>>[]> {
    const entities = this.context.user.findMany(args);
    return entities as unknown as FilterNever<SelectedFields<User, Selected>>[] ?? [];
  }

  async get<Selected extends Partial<SelectType<User>>>(
    args: { where: Partial<User>, select?: Selected, },
  ): Promise<FilterNever<SelectedFields<User, Selected>> | null> {
    const entity = await this.context.user.findFirst(args);
    return entity as unknown as FilterNever<SelectedFields<User, Selected>> ?? null;
  }
}
