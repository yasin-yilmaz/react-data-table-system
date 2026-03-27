import { fetchJson } from "@/lib/api/fetchJson";

import {
  TUsersQueryParams,
  TUsersResponse,
} from "@/modules/users-table/types/User.type";

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
    searchParams.set("value", String(activeFilter.value));
  }

  const data = await fetchJson<TUsersResponse>(
    `${endpoint}?${searchParams.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!Array.isArray(data.users)) {
    throw new Error("Invalid API response.");
  }

  return data;
};

export default getUsers;
