import axiosClient from "@/utils/axios-client";

export const createStore = async (data: any) =>{
    const response = await axiosClient.post('/stores', data)
    return response.data
}