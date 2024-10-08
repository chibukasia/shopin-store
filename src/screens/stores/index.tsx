"use client";
import { useEffect, useState } from "react";
import { fetchUserStores } from "./api";
import StoreCard from "@/components/molecules/cards/StoreCard";
import { Store } from "@/global-types";
import { Card, CardContent } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authRedirect } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const StoresScreen = () => {
  const router = useRouter();

  const {data: userStores, isLoading, isError, error} = useQuery({ 
     queryKey: ["user-stores"],
     queryFn: () => fetchUserStores(),
     });
  const handleOnStoreClick = async (id: string) => {
    router.push(`/stores/${id}`);
  };

  if(isError) {
    authRedirect(router, error as any)
    return
  }

  const handleAddStore = async () => {
    router.push("/stores/create-store/");
  };

  if(isLoading || !userStores) return <p>Loading...</p>
  return (
    <div className="py-6">
      <div>
        <h2 className="text-2xl font-bold">Your Stores</h2>
      </div>
      <div className="sm:flex-col md:flex-row flex flex-wrap gap-4 sm:justify-center md:justify-start py-4">
        {userStores.map((store) => (
          <StoreCard
            image_url={store.logo}
            name={store.store_name}
            onClick={() => handleOnStoreClick(store.id)}
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
    </div>
  );
};

export default StoresScreen;
