'use client'

import { useState } from "react"
import { OrderInfo } from "@/app/dashboard/orders/columns"
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
import { EditOrderStatusPayload } from "@/lib/apiValidators/editOrderStatusValidator"
import { AiOutlineLoading } from "react-icons/ai"

type Props = {
    order: OrderInfo
}

type OrderStatus = "DELIVERED" | "PENDING"

const EditOrderButton = ({ order }: Props) => {

    const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status)
    const router = useRouter()
    const { toast } = useToast()

    const { mutate: editOrderStatus, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: EditOrderStatusPayload = {
                id: order.id,
                status: orderStatus
            }

            const { data } = await axios.patch('/api/orders/edit-status', payload)
            return data;
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
                description: 'Order Status Updated Successfully'
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
                <DropdownMenuLabel>Order Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={orderStatus}
                    onValueChange={(value) => {
                        setOrderStatus(value as OrderStatus)
                        editOrderStatus()
                    }}
                >
                    <DropdownMenuRadioItem value="PENDING">Pending</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="DELIVERED">Delivered</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default EditOrderButton