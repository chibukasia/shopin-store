import DataTable from "@/components/molecules/tables/DataTable";
import { userColumns } from "./tables/userColumns";
import { useQuery } from "@tanstack/react-query";
import { getBranchAdmins } from "./api";
import { useMemo } from "react";

const seacrhItems = [
    {
        label: "Name",
        value: "name",
    }, 
    {
        label: "Email",
        value: "email",
    },
    {
        label: "Role",
        value: "role",
    },
]
const UsersScreen = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["branch-admins"],
    queryFn: getBranchAdmins
  });

  const memoizedUsers = useMemo(() => {
    if (!users) return []

    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      start_date: user.createdAt,
      branch_name: user.branch?.branch_name ?? "--",
      branch_address: user.branch?.address ?? "--",
      store_name: user.branch?.store?.store_name ?? "--"
    }))
  }, [users])
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <DataTable
          columns={userColumns}
          data={memoizedUsers ?? []}
          searchTypes={
            seacrhItems
          }
        />
      )}
    </div>
  );
};

export default UsersScreen;
