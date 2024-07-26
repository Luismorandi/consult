export interface RoleEntity {
  id: string;
  permissions: string[];
  type: string;
  created_at: Date;
  updated_at: Date;
}
