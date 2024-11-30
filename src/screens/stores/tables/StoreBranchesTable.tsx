"use client"
import { useQuery } from "@tanstack/react-query";
import { storeBranchesTableColumns } from "./branch-table-columns";
import DataTable from "@/components/molecules/tables/DataTable";
import { fetchStoreBranches } from "../api";

const StoreBranchesTable = ({id}: {id: string}) =>{
    const { data, isError, isLoading} = useQuery({
        queryKey:['store-branches'],
        queryFn: () => fetchStoreBranches(id)
    }) 

    if (isError) return <p>Error getting store branches</p>
    return(
        <DataTable data={data ?? []} columns={storeBranchesTableColumns} />
    )
}

export default StoreBranchesTable