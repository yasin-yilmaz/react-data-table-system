import { TUsersQueryParams, TUsersResponse } from "@/types/User.type";

const BASE_URL = "https://dummyjson.com/users";

const getSortingParams = (sorting?: TUsersQueryParams["sorting"]) => {
  const currentSort = sorting?.[0];

  if (!currentSort) {
    return {
      sortBy: undefined,
      order: undefined,
    };
  }

  return {
    sortBy: currentSort.id,
    order: currentSort.desc ? "desc" : "asc",
  };
};

const getUsers = async ({
  pageIndex,
  pageSize,
  sorting,
  search,
  filters,
}: TUsersQueryParams): Promise<TUsersResponse> => {
  const limit = pageSize;
  const skip = pageIndex * pageSize;

  const { sortBy, order } = getSortingParams(sorting);

  const searchParams = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    searchParams.set("sortBy", sortBy);
  }

  if (order) {
    searchParams.set("order", order);
  }

  const trimmedSearch = search?.trim();
  const activeFilter = filters?.[0];

  let endpoint = BASE_URL;

  if (trimmedSearch) {
    endpoint = `${BASE_URL}/search`;
    searchParams.set("q", trimmedSearch);
  } else if (activeFilter) {
    endpoint = `${BASE_URL}/filter`;
    searchParams.set("key", activeFilter.id);
    searchParams.set("value", activeFilter.value);
  }

  const response = await fetch(`${endpoint}?${searchParams.toString()}`, {
    cache: "no-store",
  });

  const data: TUsersResponse = await response.json();

  return data;
};

export default getUsers;
