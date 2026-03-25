import { useQuery } from "@tanstack/react-query";

import getUsers from "@/modules/users-table/services/users.service";
import type { TUsersQueryParams } from "@/modules/users-table/types/User.type";

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
