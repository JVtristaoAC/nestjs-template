import { BaseEntity } from '@modules/domain/entities/base.entity';
import { FilterNever, IBaseRepository, SelectedFields, SelectType } from '@modules/domain/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  constructor(private readonly context: PrismaService) {
  }

  async create<Selected extends Partial<SelectType<T>>>(Entity: { new(): T, }, args: { data: Partial<T>, select?: Selected, }): Promise<FilterNever<SelectedFields<T, Selected>>> {
    const instance = new Entity();
    return await (this.context[instance.getEntityName()] as any).create(args);
  }

  async update(Entity: { new(): T, }, args: { where: Partial<T>, data: Partial<T>, }): Promise<void> {
    const instance = new Entity();
    return await (this.context[instance.getEntityName()] as any).update(args);
  };

  async delete(Entity: { new(): T, }, args: { where: Partial<T>, }): Promise<void> {
    const instance = new Entity();
    return await (this.context[instance.getEntityName()] as any).delete(args);
  };

  async list<Select extends Partial<SelectType<T>>>(Entity: { new(): T, }, args: { where: Partial<T>, select?: Select, }): Promise<FilterNever<SelectedFields<T, Select>>[]> {
    const instance = new Entity();
    return await (this.context[instance.getEntityName()] as any).findMany(args);
  };

  async get<Select extends Partial<SelectType<T>>>(Entity: { new(): T, }, args: { where: Partial<T>, select?: Select, }): Promise<FilterNever<SelectedFields<T, Select>>> {
    const instance = new Entity();
    return await (this.context[instance.getEntityName()] as any).findFirst(args);
  };
}
