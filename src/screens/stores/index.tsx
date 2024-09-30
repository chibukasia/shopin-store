"use client";
import { useEffect, useState } from "react";
import { fetchUserStores } from "./api";
import StoreCard from "@/components/molecules/cards/StoreCard";
import { Store } from "@/global-types";
import { Card, CardContent } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import ModalTemplate from "@/components/molecules/modals/ModalTemplate";
import { authRedirect } from "@/utils";
import EditStore from "./forms/EditStore";

const StoresScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false)

  const router = useRouter();

  useEffect(() => {
    fetchUserStores()
      .then((data) => {
        console.log(data);
        setStores(data);
      })
      .catch((error) => {
        console.log(error);
        authRedirect(router, error)
      });
  }, []);

  const handleOnStoreClick = () => {
    setShowModal(true)
  };
  const handleAddStore = () => {
    router.push("/stores/create-store/");
  };
  return (
    <div className="py-6">
      <div>
        <h2 className="text-2xl font-bold">Your Stores</h2>
      </div>
      <div className="sm:flex-col md:flex-row flex flex-wrap gap-4 sm:justify-center md:justify-start py-4">
        {stores.map((store) => (
          <StoreCard
            image_url={store.logo}
            name={store.store_name}
            onClick={handleOnStoreClick}
          />
        ))}
        <Card
          className="bg-muted/90 rounded-xl sm:w-full md:w-52 cursor-pointer hover:brightness-50"
          onClick={handleAddStore}
        >
          <CardContent className="flex flex-col justify-center items-center h-full">
            <FaPlus size={72} className="text-teal-500" />
            <p className="">Add Store</p>
          </CardContent>
        </Card>
      </div>
      <ModalTemplate title="Edit Store" open={showModal} onOpenChange={setShowModal}>
        <EditStore />
      </ModalTemplate>
    </div>
  );
};

export default StoresScreen;
