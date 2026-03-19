import { TUsersResponse } from "@/types/User.type";

const BASE_URL = "https://dummyjson.com/users";

const getUsers = async (): Promise<TUsersResponse> => {
  const response = await fetch(BASE_URL, {
    cache: "no-store",
  });

  const data: TUsersResponse = await response.json();

  return data;
};

export default getUsers;
