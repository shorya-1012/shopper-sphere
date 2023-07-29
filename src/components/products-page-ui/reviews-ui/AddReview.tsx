'use client'

import { Loader2 } from "lucide-react"
import { BsStarFill, BsStar } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AddReviewPayload } from "@/lib/apiValidators/addReviewValidator"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type Props = {
    productId: string
}

const AddReview = ({ productId }: Props) => {

    const [toggleForm, setToggleForm] = useState(false)
    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewDescription, setReviewDescription] = useState('')

    const stars = Array(5).fill(0)
    const [rating, setRating] = useState(5)
    const [hoverRating, setHoverRating] = useState(rating)

    const { toast } = useToast()
    const router = useRouter()

    const { mutate: addReview, isLoading } = useMutation({
        mutationFn: async () => {
            const payload: AddReviewPayload = {
                productId,
                rating,
                commentTitle: reviewTitle,
                comment: reviewDescription
            }
            const { data } = await axios.post('/api/products/reviews/add', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 422) {
                    toast({
                        variant: 'destructive',
                        title: "Couldn't add review",
                        description: "Review title should contain atleast 3 character"
                    })
                    return
                }
                if (err.response?.status === 401) {
                    router.push('/sign-in')
                    return
                }
                toast({
                    variant: 'destructive',
                    title: "Couldn't add review",
                    description: "Some error occured while adding review"
                })
            }
        },
        onSuccess: () => {
            setToggleForm(false)
            setReviewTitle('')
            setReviewDescription('')
            toast({
                title: 'Success',
                description: 'Review shared successfully'
            })
            router.refresh()
        }
    })


    return (
        <div className="flex flex-col">
            {
                !toggleForm &&
                <button onClick={() => setToggleForm(true)} className="w-[250px] h-[45px] bg-gray-800 hover:bg-gray-900 text-white rounded">
                    Add Review
                </button>
            }
            {
                toggleForm &&
                <div data-aos="fade-up" className="flex flex-col place-self-center gap-3 my-5 w-[100%] md:w-[60%] items-start">
                    <div className="flex w-full flex-col my-2 items-start gap-4">
                        <Label className="text-lg">Rate Our Product</Label>
                        <div className="flex gap-2 text-yellow-400 text-3xl">
                            {
                                stars.map((_, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setRating(index + 1)}
                                            onMouseEnter={() => setHoverRating(index + 1)}
                                            onMouseLeave={() => setHoverRating(rating)}
                                        >
                                            {hoverRating >= index + 1 ?
                                                <BsStarFill /> : <BsStar />}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="flex w-full flex-col my-2 items-start gap-3">
                        <Label className="text-lg">Review Title</Label>
                        <Input
                            placeholder="Enter title of your review"
                            onChange={(e) => setReviewTitle(e.target.value)}
                            value={reviewTitle}
                            className="w-full rounded-xl h-[45px]"
                        />
                    </div>
                    <div className="flex w-full my-2 flex-col items-start gap-3">
                        <Label className="text-lg">Review Description</Label>
                        <Textarea
                            placeholder="Enter description of your review"
                            className="w-full rounded-xl"
                            onChange={(e) => setReviewDescription(e.target.value)}
                            value={reviewDescription}
                            rows={4}
                        />
                    </div>
                    <div className="place-self-end flex items-center gap-3">
                        <button
                            onClick={() => setToggleForm(false)}
                            className="w-[100px] h-[40px] px-3 py-1 border-[1px] border-gray-500 text-gray-500 rounded">
                            Cancel
                        </button>
                        <button
                            onClick={() => addReview()}
                            disabled={isLoading}
                            className="w-[160px] md:w-[200px] h-[40px] px-3 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded flex items-center justify-center gap-3">
                            {isLoading ? <Loader2 className="animate-spin" /> : <BiPencil />}
                            <span>{isLoading ? 'Adding review' : 'Add Review'}</span>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddReview