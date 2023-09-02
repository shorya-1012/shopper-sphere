'use client'

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
import { AiOutlineLoading } from "react-icons/ai"
import { UserInfo } from "@/app/dashboard/users/columns"
import { EditUserStatusPayload } from "@/lib/apiValidators/editUserRoleValidator"

type Props = {
    user: UserInfo
}

type UserStatus = "USER" | "ADMIN"

const EditUserStatusButton = ({ user }: Props) => {

    const [userStatus, setOrderStatus] = useState<UserStatus>(user.role)
    const router = useRouter()
    const { toast } = useToast()

    const { mutate: editOrderStatus, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: EditUserStatusPayload = {
                id: user.id,
                status: user.role
            }

            const { data } = await axios.patch('/api/users/edit-role', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: "Couldn't Upadte Order Status",
                        description: "Some error occured"
                    })
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/')
                    return
                }
                toast({
                    variant: 'destructive',
                    title: "Couldn't Update Order Status",
                    description: "Some error occured while updating order status"
                })
            }
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'User Role Updated Successfully'
            })
            router.refresh()
        }
    })

    if (isLoading) {
        return (
            <AiOutlineLoading className="animate-spin" />
        )
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreHorizontal size={"24px"} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 py-5 bg-zinc-100">
                <DropdownMenuLabel>User Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={userStatus}
                    onValueChange={(value) => {
                        setOrderStatus(value as UserStatus)
                        editOrderStatus()
                    }}
                >
                    <DropdownMenuRadioItem value="USER">User</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default EditUserStatusButton;