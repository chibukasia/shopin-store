import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";
import { BiEditAlt } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { BsEyeFill } from "react-icons/bs";
import dayjs from "dayjs"
import {capitalize} from "lodash"
import Badge from "@/components/atoms/badge/Badge";
import Link from "next/link";

interface UserTableColumns {
  id: string;
  name: string;
  email: string;
  role: string;
  start_date: Date;
  status: string;
  branch_name: string;
  store_name: string;
  branch_address: string;
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
    cell: ({row}) => {
      return<p>{capitalize(row.original.role.replace('_', ' '))}</p>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Status" />
    ),
    cell: ({row}) => {
      return<Badge title={row.original.status} bgColor="red-500"/>
    }
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Start Date" />
    ),
    cell: ({row}) => {
      return<p>{dayjs(row.original.start_date).format("DD/MM/YYYY")}</p>
    }
  },
  {
    accessorKey: "branch_name",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "branch_address",
    header: ({ column }) => (
      <DataTableHeaderColumn column={column} title="Location" />
    ),
  },
  {
    accessorKey: "store_name",
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
        const oneEditUser = () => {
            alert(row.original.id)
        }
        const onDeleteUser = () => {
            alert(row.original.id)
        }
      return (
        <div className="flex space-x-3">
          <Link href={`/users/${row.original.id}/`}><BsEyeFill className="cursor-pointer text-primary" size={"20"}/></Link>
          <BiEditAlt className="cursor-pointer text-primary" size={"20"} onClick={oneEditUser}/>
          <FaTrashCan className="cursor-pointer text-red-500" size={"20"} onClick={onDeleteUser}/>
        </div>
      );
    },
  },
];
