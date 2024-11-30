import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";
import { BiEditAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface StoreBranchData {
  id: string;
  name: string;
  location: string;
  users: number;
}

export const storeBranchesTableColumns: ColumnDef<StoreBranchData>[] = [
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
