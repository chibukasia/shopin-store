import DataTableHeaderColumn from "@/components/molecules/tables/DataTableColumnHaeder";
import { ColumnDef } from "@tanstack/react-table";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface StoreBranchData {
  id: string;
  name: string;
  location: string;
  users: number;
}

export const storeBranchesTableColumns: ColumnDef<StoreBranchData>[] = [
  {
    accessorKey: "name",
    header: ({column}) =>(
      <DataTableHeaderColumn column={column} title="Name"/>
    ),
  },
  {
    accessorKey: "location",
    header: ({column}) =>(
      <DataTableHeaderColumn column={column} title="Location"/>
    ),
  },
  {
    accessorKey: "users",
    header: ({column}) =>(
      <DataTableHeaderColumn column={column} title="Users"/>
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
        <div className="flex w-24 justify-between">
          <MdEdit size={24} onClick={onEditClick}/>
          <FaRegTrashAlt color="red" size={24} onClick={onDeleteClick}/>
        </div>
      );
    },
  },
];
