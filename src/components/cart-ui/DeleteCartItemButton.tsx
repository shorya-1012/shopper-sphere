'use client'
import { useMutation } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import axios, { AxiosError } from "axios"
import { useToast } from "../ui/use-toast"
import { RemoveCartItemPayload } from "@/lib/apiValidators/removeCartItemValidator"
import { useRouter } from "next/navigation"

type Props = {
    productId: string
}

const DeleteCartItemButton = ({ productId }: Props) => {

    const { toast } = useToast()
    const router = useRouter()

    const { mutate: deleteCartItem, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: RemoveCartItemPayload = {
                productId
            }

            const { data } = await axios.delete('/api/cart/remove', { data: payload })
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                toast({
                    variant: 'destructive',
                    title: "Couldn't update quantity",
                    description: "Some error occured while updating"
                })
            }
        },
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Cart Item Updated Successfully'
            })
            router.refresh()
        }
    })

    return (
        <button
            onClick={() => deleteCartItem()}
            disabled={isLoading}
            className="h-[20px] sm:h-fit w-fit px-2 py-1 border-[1px] border-gray-500 text-gray-500 rounded text-xs flex justify-center items-center">
            {isLoading ?
                <div className="flex items-center gap-1">
                    <Loader2 size={'12px'} className="animate-spin" />
                    <span>Deleting</span>
                </div> :
                <div className="flex items-center gap-3">
                    <Trash2 size={'12px'} />
                    <span>Remove</span>
                </div>
            }
        </button>
    )
}

export default DeleteCartItemButton