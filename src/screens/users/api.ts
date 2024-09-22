import axiosClient from "@/utils/axios-client";
import { EUser } from "@/utils/entities";

export const createUser = async (data: EUser) => {
    const response = await axiosClient.post('/users/create_user', data)
    return response.data
}