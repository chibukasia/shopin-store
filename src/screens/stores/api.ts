import { Store } from "@/global-types";
import axiosClient from "@/utils/axios-client";

export const createStore = async (data: any) =>{
    const response = await axiosClient.post('/stores', data)
    return response.data
}

export const fetchUserStores = async (id?: string) =>{
    const response = await axiosClient.get<Store[]>(`/stores/user-stores/${id}`)
    return response.data

}

export const fetchStoreDetails = async(id: string) => {
    const response = await axiosClient.get(`/stores/${id}`)
    return response.data
}

export const updateStoreDetails = async(id: string, data: any) =>{
    const response = await axiosClient.patch(`/stores/${id}`, data)
    return response.data
}

export const fetchStoreBranches = async(id: string) => {
    const response = await axiosClient.get(`/branches/store-branches/${id}/`)
    return response.data
}