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
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "users",
    header: "Users",
  },
  {
    id: "edit",
    header: "Action",
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
