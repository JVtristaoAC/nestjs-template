export interface BaseEntity {
  created_at: Date;
  updated_at: Date;

  /**
   * @returns the database related entity name
   */
  getEntityName: () => string;
}
