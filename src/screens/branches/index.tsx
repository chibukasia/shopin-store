"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DataTable from "@/components/molecules/tables/DataTable";
import { branchesTableColumns } from "./tables/branch-columns";
import { useQuery } from "@tanstack/react-query";
import { fetchUserBranches } from "./api";
import { fetchUserStores } from "../stores/api";

const searchItems = [
  {
    label: "name",
    value: "branch_name",
  },
];
const BranchesScreen = () => {
  const router = useRouter();

  const {
    data: branches,
    isLoading: branchesLoading,
    isError: branchError,
  } = useQuery({
    queryKey: ["user-branches"],
    queryFn: fetchUserBranches,
  });

  const {
    data: stores,
    isLoading: storesLoading,
    isError: storesError,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: () => fetchUserStores(),
  });
  const onEditBranchClick = () => {
    router.push("/store-branches/create-branch");
  };

  if (branchError || storesError)
    return <p>Something went wrong getting branches</p>;

  if (!branches || branchesLoading || !stores || storesLoading)
    return <p>Loading...</p>;
  return (
    <div className="space-y-4 py-3">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-10">
            <h2 className="text-xl font-bold">Branches</h2>
          </div>
          <div className=" md:flex gap-3">
            {stores.map((store) => (
              <Card className="sm:w-72 md:w-60 mb-3" key={store.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl">{store.store_name}</CardTitle>
                <CardTitle className="text-2xl">{store.branch.length}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">Branches</div>
              </CardContent>
            </Card>
            ))}
          </div>
        </CardHeader>
        <CardFooter></CardFooter>
      </Card>
      <div></div>
      <div className="space-y-3">
        <Card>
          <CardHeader className="pb-3">
            <div className=" flex justify-between">
              <h2 className="text-lg font-semibold">Store Branches</h2>
              <Button onClick={onEditBranchClick}>Create Branch</Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={branches ?? []}
              columns={branchesTableColumns}
              searchTypes={searchItems}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BranchesScreen;
