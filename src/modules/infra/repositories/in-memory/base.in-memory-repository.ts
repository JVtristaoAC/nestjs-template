import { BaseEntity } from '@modules/domain/entities';
import { FilterNever, IBaseRepository, SelectedFields, SelectType } from '@modules/domain/repositories';

export abstract class BaseInMemoryRepository<T extends BaseEntity> implements IBaseRepository<T> {
  private readonly data: T[] = [];

  async create<Selected extends Partial<SelectType<T>>>(args: { data: Partial<T>, select?: Selected, }): Promise<FilterNever<SelectedFields<T, Selected>>> {
    const entity: T = {
      ...args.data,
      id: String(crypto.randomUUID()),
      created_at: new Date(),
    } as T;

    this.data.push(entity);

    return this.applySelect(entity, args.select);
  };

  async update(args: { where: Partial<T>, data: Partial<T>, }): Promise<void> {
    const index = this.data.findIndex(item => this.matchWhere(item, args.where));
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...args.data };
    }
  }

  async delete(args: { where: Partial<T>, }): Promise<void> {
    const index = this.data.findIndex(item => this.matchWhere(item, args.where));
    if (index !== -1) {
      this.data.splice(index, 1);
    }
  }

  async list<Selected extends Partial<SelectType<T>>>(
    args: { where: Partial<T>, select?: Selected, },
  ): Promise<FilterNever<SelectedFields<T, Selected>>[]> {
    const filtered = this.data.filter(item => this.matchWhere(item, args.where));
    return filtered.map(item => this.applySelect(item, args.select));
  }

  async get<Selected extends Partial<SelectType<T>>>(
    args: { where: Partial<T>, select?: Selected, },
  ): Promise<FilterNever<SelectedFields<T, Selected> | null>> {
    const entity = this.data.find(item => this.matchWhere(item, args.where));
    if (!entity) {
      return null;
    }

    return this.applySelect(entity, args.select);
  }

  protected matchWhere(item: T, where: Partial<T>): boolean {
    return Object.entries(where).every(
      ([key, value]) => (item as any)[key] === value,
    );
  }

  protected applySelect<Selected extends Partial<SelectType<T>>>(
    entity: T,
    select?: Selected,
  ): FilterNever<SelectedFields<T, Selected>> {
    if (!select) {
      return entity as any; // Return the whole entity if no selection
    }

    const result = {} as any;
    for (const key in select) {
      if (select[key]) {
        result[key] = entity[key as any];
      }
    }
    return result;
  }
}
