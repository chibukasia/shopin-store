"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
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

const StoreDetailsScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [store, setStore] = useState<Store | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const params = useParams();
  useEffect(() => {
    setLoading(true);
    fetchStoreDetails(params.id as string)
      .then((data) => {
        setStore(data);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [params.id, showModal]);

  const onEditStoreClick = () => {
    setShowModal(true);
  };
  if (loading || !store) return <p>Loading...</p>;

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
