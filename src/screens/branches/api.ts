import { UserData } from "@/global-types"
import axiosClient from "@/utils/axios-client"

export const fetchBranchAdmins = async () => {
    const response = await axiosClient.get<UserData[]>('/users/user-branch-admins')
    return response.data
}

export const createBranch = async (data: any) => {
    const response = await axiosClient.post('/branches/', data)
    return response.data
}

export const fetchUserBranches = async () => {
    const response = await axiosClient.get('/branches/user-branches/')
    return response.data
}