import { Button } from "@/components/ui/button";
import UsersTable from "@/modules/user-table/UsersTable";

const HomePage = () => {
  return (
    <main className="container mx-auto py-10">
      <UsersTable />
    </main>
  );
};

export default HomePage;
