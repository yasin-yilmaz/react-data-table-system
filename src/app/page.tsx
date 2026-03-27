import { Suspense } from "react";

import ModeToggle from "@/components/ModeToggle";

import UsersTable from "@/modules/users-table/components/UsersTable";

const HomePage = () => {
  return (
    <main className="container mx-auto py-10">
      <div className="mb-4 flex justify-end">
        <ModeToggle />
      </div>
      <Suspense fallback={<div>Loading user table...</div>}>
        <UsersTable />
      </Suspense>
    </main>
  );
};

export default HomePage;
