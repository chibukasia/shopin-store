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
        className="sm:col-span-2 sm:w-full md:w-full lg:w-3/4"
        x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-10">
            <Image
              width={100}
              height={100}
              src={store.logo}
              alt={store.store_name}
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold">{store.store_name}</h2>
          </div>
          <CardDescription className=" text-balance leading-relaxed">
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
      <div className="space-y-3 sm:w-full md:w-full lg:w-3/4">
        <Card>
          <CardHeader className="pb-3">
            <div>
              <h2 className="text-lg font-semibold">Store Branches</h2>
            </div>
          </CardHeader>
          <CardContent>
            <StoreBranchesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreDetailsScreen;
