'use client'

import ProductAction from "@/components/dashboard-ui/ProductAction"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export type ProductInfo = {
    id: string
    image: string
    name: string
    price: string
}

export const columns: ColumnDef<ProductInfo>[] = [
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
        accessorKey: "price",
        header: "Price"
    },
    {
        header: "Action",

        cell: ({ row }) => {
            const product = row.original

            return (
                <ProductAction product={product} />
            )
        }
    }
]