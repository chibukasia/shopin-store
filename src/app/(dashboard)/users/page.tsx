'use client'
import ActionButton from "@/components/atoms/buttons/ActionButton"
import UsersScreen from "@/screens/users"
import { useRouter } from "next/navigation"

const Users = () => {
    const router = useRouter()
    return (
        <main className="flex min-h-screen w-full flex-col my-4">
            <div className="flex justify-between items-center py-4">
                <h2 className="text-2xl font-bold">All Users</h2>
                <ActionButton title="Create New User" onClick={() => router.push('/users/create-user/')}/>
            </div>
            <UsersScreen />
        </main>
    )
}

export default Users