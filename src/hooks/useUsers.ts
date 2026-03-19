import getUsers from "@/services/users.service";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    placeholderData: (prev) => prev,
  });
};

export default useUsers;
