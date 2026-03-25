export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  gender: string;
  age: number;
  birthDate: string;
  image: string;
  address: {
    country: string;
  };
};

export type TUsersResponse = {
  users: TUser[];
  total: number;
  skip: number;
  limit: number;
};

export type TUserSorting = {
  id: string;
  desc: boolean;
};

export type TUserFilter = {
  id: string;
  value: string;
};

export type TUsersQueryParams = {
  pageIndex: number;
  pageSize: number;
  sorting?: TUserSorting[];
  search?: string;
  filters?: TUserFilter[];
};
