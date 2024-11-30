"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchStoreDetails } from "./api";
import { Store } from "@/global-types";
import ModalTemplate from "@/components/molecules/modals/ModalTemplate";
import EditStore from "./forms/EditStore";
import { Button } from "@/components/ui/button";
import StoreBranchesTable from "./tables/StoreBranchesTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { authRedirect } from "@/utils";
import Badge from "@/components/atoms/badge/Badge";

const StoreDetailsScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  const {
    data: store,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["store-details", showModal],
    queryFn: () => fetchStoreDetails(params.id as string),
  });
  const onEditStoreClick = () => {
    setShowModal(true);
  };
  if (isError) {
    authRedirect(router, error as any);
    return;
  }
  if (isLoading || !store) return <p>Loading...</p>;

  return (
    <div className="space-y-4 py-3">
      <Card
        className="sm:col-span-2 sm:w-full md:w-full "
        x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <div className=" sm:items-start md:items-center space-y-1">
            <div className="flex space-x-10 items-center pb-6">
            <Image
              width={100}
              height={100}
              src={store.logo}
              alt={store.store_name}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold">{store.store_name}</h2>
            </div>
            
            <div>
              <p className="text-xl font-bold text-balance">Branches: {store.branch_count}</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-xl font-bold text-balance">Status: </p>
              <Badge title={store.status} />
            </div>
          </div>
          <CardDescription className="text-balance leading-relaxed">
          <p className="text-xl font-bold">About </p>
            {store.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onEditStoreClick}>Edit Store</Button>
        </CardFooter>
      </Card>
      <div>
        <ModalTemplate
          title="Edit Store"
          open={showModal}
          onOpenChange={setShowModal}
        >
          <EditStore data={store} setShowModal={setShowModal} />
        </ModalTemplate>
      </div>
      <div className="space-y-3 sm:w-full md:w-full ">
        <Card>
          <CardHeader className="pb-3">
            <div>
              <h2 className="text-lg font-semibold">Store Branches</h2>
            </div>
          </CardHeader>
          <CardContent>
            <StoreBranchesTable id={store.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreDetailsScreen;
