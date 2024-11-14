import DataTable from "@/components/molecules/tables/DataTable";
import { userColumns } from "./tables/userColumns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3003/users/");
      return response.data;
    },
  });
  return (
    <div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <DataTable
          columns={userColumns}
          data={users ?? []}
          searchTypes={
            seacrhItems
          }
        />
      )}
    </div>
  );
};

export default UsersScreen;
