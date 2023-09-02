'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditUserStatusButton from "@/components/dashboard-ui/EditUserStatusButton"

export type UserInfo = {
    id: string
    image: string
    username: string
    role: "USER" | "ADMIN"
}

export const columns: ColumnDef<UserInfo>[] = [
    {
        accessorKey: "image",
        header: "Profile Image",
        cell: ({ row }) => {
            const user = row.original

            return (
                <Avatar>
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            )
        }
    },
    {
        accessorKey: "username",
        header: "Name",
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="max-w-[250px]">
                    <p>{user.username}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "role",
        header: "Role"
    },
    {
        header: "Action",
        cell: ({ row }) => {
            const user = row.original

            return (
                <EditUserStatusButton user={user} />
            )
        }
    }
]