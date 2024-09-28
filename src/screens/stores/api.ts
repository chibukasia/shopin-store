import axiosClient from "@/utils/axios-client";

export const createStore = async (data: any) =>{
    const response = await axiosClient.post('/stores', data)
    return response.data
}

export const fetchUserStores = async (id?: string) =>{
    const response = await axiosClient.get(`/stores/user-stores/${id}`)
    return response.data

}