import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

const page = () => {

    return (
        <div className="w-screen h-screen overflow-hidden pb-20 flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="font-heading text-xl sm:text-2xl">Your order was placed Successfully!!</h1>
            <Link href={'/'}>
                <div className="h-[40px] w-[250px] rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm flex gap-3 justify-center items-center">
                    Continue Shopping
                    <ArrowRight size={'15px'} />
                </div>
            </Link>
            <Link href={'/orders'}>
                <div className="h-[40px] w-[200px] rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-900 text-sm flex gap-3 justify-center items-center">
                    View Your Orders
                    <ShoppingBag size={'15px'} />
                </div>
            </Link>
        </div>
    )
}

export default page