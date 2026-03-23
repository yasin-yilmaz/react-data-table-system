import getUsers from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

import type { TUsersQueryParams } from "@/types/User.type";

const useUsers = ({
  pageIndex,
  pageSize,
  filters,
  search,
  sorting,
}: TUsersQueryParams) => {
  return useQuery({
    queryKey: ["users", pageIndex, pageSize, filters, search, sorting],
    queryFn: () => getUsers({ pageIndex, pageSize, filters, search, sorting }),
    placeholderData: (prev) => prev,
  });
};

export default useUsers;
