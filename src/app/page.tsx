import { Suspense } from "react";

import UsersTable from "@/components/modules/user-table/UsersTable";

const HomePage = () => {
  return (
    <main className="container mx-auto py-10">
      <Suspense fallback={<div>Loading table...</div>}>
        <UsersTable />
      </Suspense>
    </main>
  );
};

export default HomePage;
