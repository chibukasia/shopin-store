import { UserData } from "@/global-types";
import axiosClient from "@/utils/axios-client";
import { EUser } from "@/utils/entities";

export const createUser = async (data: EUser) => {
    const response = await axiosClient.post('/users/create_user', data)
    return response.data
}

export const getBranchAdmins = async () => {
    const response = await axiosClient.get('/users/user-branch-admins')
    console.log(response.data)
    return response.data
}