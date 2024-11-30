import DataTable from "@/components/molecules/tables/DataTable";
import dayjs from "dayjs";

interface IProps {
    data: any[],
    searchItems: {label: string, value: string}[]
}
const BranchesTable = (props: IProps) => {
    const { data, searchItems} = props
    return(
        <DataTable data={data ?? []} columns={[]} searchTypes={searchItems}/>
    )
}

export default BranchesTable
