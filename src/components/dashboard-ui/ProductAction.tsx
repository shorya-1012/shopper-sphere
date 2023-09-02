'use client'

import { ProductInfo } from "@/app/dashboard/products/columns"
import { Trash, PenLine, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"

import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { DeleteProductPayload } from "@/lib/apiValidators/deleteProductValidator"
import Link from "next/link"


type Props = {
    product: ProductInfo
}

const ProductAction = ({ product }: Props) => {

    const router = useRouter()
    const { toast } = useToast()

    const handleEdit = () => {
        router.push(`/dashboard/edit-product?productId=${product.id}`)
    }

    const { mutate: deleteProduct, isLoading: isDeleting } = useMutation({
        mutationFn: async () => {
            const payload: DeleteProductPayload = {
                productId: product.id
            }
            const { data } = await axios.delete('/api/products/delete', { data: payload })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    toast({
                        variant: 'destructive',
                        title: 'UnSuccessfull',
                        description: 'You are not authorized to perform this action'
                    })
                    return
                }
                toast({
                    variant: 'destructive',
                    title: "Unsuccessfull",
                    description: "Some error occured"
                })
            }
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Product Deleted Successfully'
            })
            router.refresh()
        }
    })

    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal size={"24px"} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-100">
                    <AlertDialogTrigger>
                        <DropdownMenuItem>
                            <div className="w-full flex items-center gap-x-2">
                                <Trash size={"16px"} />
                                <span>Delete</span>
                            </div>
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <div onClick={() => handleEdit()} className="w-full flex items-center gap-x-2">
                            <PenLine size={"16px"} />
                            <span>Edit</span>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to Delete ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This is a permanent action and cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <button onClick={() => deleteProduct()}>
                            Delete
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ProductAction