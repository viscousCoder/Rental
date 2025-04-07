export interface userInfo {
  id?: string;
  fullname: string;
  email: string;
  password: string;
  confirmpassword?: string;
  mobile: string;
  userrole: string;
  agreeterms: boolean;
}

export interface userlogin {
  email: string;
  password: string;
  userrole: string;
}
