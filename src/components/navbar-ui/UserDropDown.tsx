'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { User } from "@prisma/client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, ShoppingBag, ChevronDown, LogOut } from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk } from "@clerk/nextjs"


const UserDropDown = () => {

    const { signOut } = useClerk()

    const { data: user, isLoading } = useQuery(['currentUserInfo'], async () => {
        const { data } = await axios.get('/api/users/curr-user-info')
        const userInfo: User = data.userInfo
        return userInfo
    })

    return (
        <div className='flex text-center h-full items-center'>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-2 items-center">
                    <Avatar className="w-[32px] h-[32px]">
                        <AvatarImage src={user?.profileImageUrl} />
                    </Avatar>
                    <div>
                        <ChevronDown size={'15px'} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-100 rounded-xl w-44">
                    <DropdownMenuLabel className="flex flex-col">
                        <span className="text-lg">Welcome</span>
                        <span>{user?.username}</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        user?.role === 'ADMIN' &&
                        <DropdownMenuItem>
                            <Link href={'/dashboard/add-product'}>
                                <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1 ">
                                    <LayoutDashboard size={15} />
                                    <span className=" text-base font-nunito">Dashboard</span>
                                </div>
                            </Link>
                        </DropdownMenuItem>
                    }
                    <DropdownMenuItem>
                        <Link href={'/orders'}>
                            <div className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1 ">
                                <ShoppingBag size={15} />
                                <span className=" text-base font-nunito">Your Orders</span>
                            </div>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <button
                            onClick={() => signOut()}
                            className="hover:text-gray-500 w-full h-full flex items-center gap-3 my-1 ">
                            <LogOut size={15} />
                            <span className=" text-base font-nunito">Sign Out</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

export default UserDropDown