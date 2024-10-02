import axiosClient from "@/utils/axios-client";

export const createStore = async (data: any) =>{
    const response = await axiosClient.post('/stores', data)
    return response.data
}

export const fetchUserStores = async (id?: string) =>{
    const response = await axiosClient.get(`/stores/user-stores/${id}`)
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