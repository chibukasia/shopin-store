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
        header: 'Name'
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: 'role',
        header: 'Role',
    }
]