'use client'
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { Label } from "../ui/label"
import { Loader2 } from "lucide-react"
import { UpdateQuantityPayload } from "@/lib/apiValidators/updateQuantityValidator"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

type Props = {
    productId: string
    quantity: number
}

const SetQuantityButton = ({ productId, quantity }: Props) => {

    const [newQuantity, setProductQuantity] = useState(quantity)
    const { toast } = useToast()
    const router = useRouter()

    const { mutate: updateQuantity, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: UpdateQuantityPayload = {
                productId,
                quantity: newQuantity
            }

            const { data } = await axios.put('/api/cart/update-quantity', payload)
            return data
        },
        onError: (err) => {
            setProductQuantity(quantity)
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
        <div className="flex my-2 sm:my-3 gap-x-2 items-end">
            <div className="flex flex-col items-start">
                <Label className="text-gray-500 font-nunito mb-2">Quantity :</Label>
                <div className="w-[80px] h-[20px] sm:w-[100px] sm:h-[30px] flex items-center justify-between rounded-full overflow-hidden border-[1px] border-gray-500 text-gray-500 px-2">
                    <button
                        onClick={() => setProductQuantity(prev => prev - 1)}
                        disabled={newQuantity === 1}
                        className="text-gray-700 h-full pr-2 pb-1 text-lg border-e-[1px] border-gray-500 flex justify-center items-center">
                        -
                    </button>
                    <span className="text-xs md:text-base">{newQuantity}</span>
                    <button
                        onClick={() => setProductQuantity(prev => prev + 1)}
                        className="text-gray-700 h-full ps-2 pb-1 text-lg border-s-[1px] border-gray-500 flex justify-center items-center">
                        +
                    </button>
                </div>
            </div>
            {
                newQuantity !== quantity &&
                <button
                    onClick={() => updateQuantity()}
                    className="h-[20px] sm:h-fit w-fit sm:mb-1 px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-xl text-xs flex justify-center items-center">
                    {isLoading ?
                        <Loader2 size={'20px'} className="animate-spin text-white" /> :
                        <span>Update</span>
                    }
                </button>
            }
        </div>
    )
}

export default SetQuantityButton