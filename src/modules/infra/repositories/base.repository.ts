import { BaseEntity } from '@modules/domain/entities/base.entity';
import { FilterNever, IBaseRepository, SelectedFields, SelectType } from '@modules/domain/repositories/base.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BaseRepository<T extends BaseEntity> implements IBaseRepository<T> {
  entity: T;
  constructor(private readonly context: PrismaService, entity: T) {
    this.entity = entity;
  }

  async create<Selected extends Partial<SelectType<T>>>(args: { data: Partial<T>, select?: Selected, }): Promise<FilterNever<SelectedFields<T, Selected>>> {
    return await (this.context[this.entity.getEntityName()] as any).create(args);
  }

  async update(args: { where: Partial<T>, data: Partial<T>, }): Promise<void> {
    return await (this.context[this.entity.getEntityName()] as any).update(args);
  };

  async delete(args: { where: Partial<T>, }): Promise<void> {
    return await (this.context[this.entity.getEntityName()] as any).delete(args);
  };

  async list<Select extends Partial<SelectType<T>>>(args: { where: Partial<T>, select?: Select, }): Promise<FilterNever<SelectedFields<T, Select>>[]> {
    return await (this.context[this.entity.getEntityName()] as any).findMany(args);
  };

  async get<Select extends Partial<SelectType<T>>>(args: { where: Partial<T>, select?: Select, }): Promise<FilterNever<SelectedFields<T, Select>>> {
    return await (this.context[this.entity.getEntityName()] as any).findFirst(args);
  };
}
