'use client'

import EditOrderButton from "@/components/dashboard-ui/EditOrderButton"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export type OrderInfo = {
    id: string
    image: string
    name: string
    amount: string
    quantity: number
    customer: string
    status: "PENDING" | "DELIVERED"
}

export const columns: ColumnDef<OrderInfo>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const product = row.original

            return (
                <div className="w-[100px] h-[100px] rounded relative overflow-hidden">
                    <Image
                        src={product.image}
                        alt="product-image"
                        fill={true}
                        className=" object-cover"
                        sizes="100%"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const product = row.original

            return (
                <div className="max-w-[250px]">
                    <p>{product.name}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "amount",
        header: "Amount"
    },
    {
        accessorKey: "customer",
        header: "Customer"
    },
    {
        accessorKey: "quantity",
        header: "Quantity"
    },
    {
        accessorKey: "status",
        header: "Status"
    },
    {
        header: "Action",
        cell: ({ row }) => {
            const order = row.original

            return (
                <EditOrderButton order={order} />
            )
        }
    }
]