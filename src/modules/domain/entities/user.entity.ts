import { BaseEntity } from './base.entity';

export class User implements BaseEntity {
  id: string;
  email: string;
  name: string;

  created_at: Date;
  updated_at?: Date;
}
