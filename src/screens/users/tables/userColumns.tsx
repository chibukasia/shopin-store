import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";

interface UserTableColumns{
    id: string
    name: string
    email: string
    role: string
}

export const userColumns: ColumnDef<UserTableColumns>[] = [
    {
        accessorKey: 'name',
        header: ({column}) =>(
            <DataTableHeaderColumn column={column} title="Name"/>
          ),
    },
    {
        accessorKey: "email",
        header: ({column}) =>(
            <DataTableHeaderColumn column={column} title="Email"/>
          ),
    },
    {
        accessorKey: 'role',
        header: ({column}) =>(
            <DataTableHeaderColumn column={column} title="Role"/>
          ),
    }
]