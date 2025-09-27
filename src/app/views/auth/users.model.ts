

export interface User {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: boolean;
  // roles?: Roles[];
  lastPwdChange?: Date;
  lastPwd?: string;
  // rolesModel?: Roles[];
  role?: [];
  // tenants?: Tenants;
  phoneNo?: string;
  name?: string;
  profileStatus?: boolean;
  // passport?: FileStorage;
  // sign?: FileStorage;
}
