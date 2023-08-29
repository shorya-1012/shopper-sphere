'use client'
import { loadStripe } from '@stripe/stripe-js'
import { useMutation } from '@tanstack/react-query'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { AiOutlineLoading } from 'react-icons/ai'
import axios, { AxiosError } from 'axios'

type Props = {
    cartItems: {
        quantity: number;
        price_data: {
            currency: string;
            unit_amount: number;
            product_data: {
                name: string;
                images: string[];
            };
        };
    }[],
    productIds: string[],
    productPrices: number[]
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)
const ProceedToCheckOutButton = ({ cartItems, productIds, productPrices }: Props) => {

    const { mutate: proceedToCheckout, isLoading } = useMutation({
        mutationFn: async () => {
            const stripe = await stripePromise
            const payload = {
                cartItems,
                productIds,
                productPrices
            }
            const { data: checkoutSession } = await axios.post('/api/checkout', payload)

            const res = await stripe?.redirectToCheckout({
                sessionId: checkoutSession.id
            })
            if (res?.error) {
                alert(res.error.message)
            }
        },
        onError: (err) => {
            alert('some error occured')
        }
    })

    return (
        <button
            onClick={() => proceedToCheckout()}
            className="w-[80%] md:w-[80%] rounded-xl h-[40px] py-2 px-3 bg-red-500 text-white flex justify-center items-center text-sm font-review hover:bg-red-600"
        >
            {
                isLoading ?
                    <div className='flex items-center gap-2'>
                        <div className='animate-spin'>
                            <AiOutlineLoading />
                        </div>
                        <span>Please Wait</span>
                    </div> :
                    <div className='flex items-center gap-2'>
                        <MdOutlineShoppingCartCheckout />
                        <span>Proceed to checkout</span>
                    </div>
            }
        </button>
    )
}

export default ProceedToCheckOutButton