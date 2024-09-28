import DataTable from "@/components/molecules/tables/DataTable";
import { userColumns } from "./tables/userColumns";

const UsersScreen = () =>{
    return(
        <div>
            <DataTable columns={userColumns} data={[]}/>
        </div>
    )
}

export default UsersScreen