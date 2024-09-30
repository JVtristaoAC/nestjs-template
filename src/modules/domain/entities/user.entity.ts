import { BaseEntity } from './base.entity';

export class User implements BaseEntity {
  getEntityName(): string {
    return 'user';
  };

  id: number;
  email: string;
  name: string;

  created_at: Date;
  updated_at: Date;
}
