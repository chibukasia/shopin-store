import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";

interface UserTableColumns {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const userColumns: ColumnDef<UserTableColumns>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Role" />
    ),
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Start Date" />
    ),
  },
  {
    accessorKey: "branch.name",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "branch.location",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Location" />
    ),
  },
  {
    accessorKey: "store.name",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Store" />
    ),
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Actions" />
    ),
    cell: ({ row }) => {
        const onViewUswerDetails = () => {
            alert(row.original.id)
        }
        const oneEditUser = () => {
            alert(row.original.id)
        }
        const onDeleteUser = () => {
            alert(row.original.id)
        }
      return (
        <div className="flex space-x-3">
          <BsEyeFill className="cursor-pointer text-primary" size={"20"} onClick={onViewUswerDetails}/>
          <BiEditAlt className="cursor-pointer text-primary" size={"20"} onClick={oneEditUser}/>
          <FaTrashCan className="cursor-pointer text-red-500" size={"20"} onClick={onDeleteUser}/>
        </div>
      );
    },
  },
];
