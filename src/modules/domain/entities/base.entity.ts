export interface BaseEntity {
  created_at: Date;
  updated_at: Date;

  /**
   * @returns name of database entity related to this class
   */
  getEntityName: () => string;
}
