import { BaseEntity } from '@domain/entities';

export type FilterNever<T> = Pick<T, { [K in keyof T]: T[K] extends never ? never : K }[keyof T]>;
export type SelectType<T> = {
  [Property in keyof T]: boolean;
};
export type SelectedFields<T, Select> = {
  [K in keyof T]: K extends keyof Select
    ? Select[K] extends true
      ? T[K]
      : never
    : never;
};

export interface IBaseRepository<T extends BaseEntity> {
  create: <Selected extends Partial<SelectType<T>>>(args: { data: Partial<T>, select?: Selected, }) => Promise<FilterNever<SelectedFields<T, Selected>> | null>;
  update: (args: { where: Partial<T>, data: Partial<T>, }) => Promise<void>;
  delete: (args: { where: Partial<T>, }) => Promise<void>;
  list: <Selected extends Partial<SelectType<T>>>(args: { where: Partial<T>, select?: Selected, }) => Promise<FilterNever<SelectedFields<T, Selected>>[]>;
  get: <Selected extends Partial<SelectType<T>>>(args: { where: Partial<T>, select?: Selected, }) => Promise<FilterNever<SelectedFields<T, Selected>> | null>;
}
