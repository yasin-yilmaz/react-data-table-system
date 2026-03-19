"use client";

import useUsers from "@/hooks/useUsers";
import DataTable from "./data-table/DataTable";
import { userColumns } from "./user-table/userColumns";

const UsersTable = () => {
  const { data } = useUsers();

  if (data) console.log(data);

  return (
    <div>
      <DataTable
        data={data?.users || []}
        total={data?.total || 0}
        columns={userColumns}
      />
    </div>
  );
};

export default UsersTable;
