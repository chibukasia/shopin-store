import Badge from "@/components/atoms/badge/Badge";
import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";

interface StoreBranchData {
    id: string;
    name: string;
    location: string;
    users: number;
    status: string;
  }
  
  export const branchesTableColumns: ColumnDef<StoreBranchData>[] = [
    {
      accessorKey: "branch_name",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Name"/>
      ),
    },
    {
      accessorKey: "branch_code",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Branch Code"/>
      ),
    },
    {
        accessorKey: "store.store_name",
        header: ({column}) =>(
          <DataTableHeaderColumn column={column} title="Store Name"/>
        ),
      },
    {
      accessorKey: "county_or_province",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="County"/>
      ),
    },
    {
      accessorKey: "town",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Town"/>
      ),
    },
    {
      accessorKey: "address",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Address"/>
      ),
    },
    {
      accessorKey: "status",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Status"/>
      ),
      cell: ({row}) => <Badge title={row.original.status} bgColor="red-500"/>
    },
    {
      accessorKey: "user.name",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Branch Admin"/>
      ),
    },
    {
      id: "edit",
      header: ({column}) =>(
        <DataTableHeaderColumn column={column} title="Actions"/>
      ),
      cell: ({ row }) => {
        const onEditClick = () => {
          // add edit logic
        }
  
        const onDeleteClick =() => {
          // add delete logic
        }
        return (
          <div className="flex w-24 ">
            <div className="flex space-x-3">
            <BsEyeFill className="cursor-pointer text-primary" size={"20"} />
            <BiEditAlt className="cursor-pointer text-primary" size={"20"} />
            <FaTrashCan className="cursor-pointer text-red-500" size={"20"} />
          </div>
          </div>
        );
      },
    },
  ];