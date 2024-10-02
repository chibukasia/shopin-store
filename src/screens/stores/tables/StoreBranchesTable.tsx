import { storeBranchesTableColumns } from "./branch-table-columns";
import DataTable from "@/components/molecules/tables/DataTable";

const StoreBranchesTable = () =>{
    return(
        <DataTable data={[]} columns={storeBranchesTableColumns}/>
    )
}

export default StoreBranchesTable