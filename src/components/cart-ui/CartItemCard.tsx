import { Decimal } from "@prisma/client/runtime/library"
import Image from "next/image"
import SetQuantityButton from "./SetQuantityButton"
import DeleteCartItemButton from "./DeleteCartItemButton"
import Link from "next/link"

type Props = {
    productImage: string,
    productId: string,
    productName: string,
    quantity: number,
    price: Decimal
}

const CartItemCard = (props: Props) => {
    return (
        <div
            data-aos="fade-right"
            className="w-full mx-3 sm:mx-5 sm:w-[600px] flex gap-3 items-center sm:items-start shrink-0 my-2 py-5 border-y-[1px] border-gray-300">
            <div className="relative h-[160px] w-[160px] sm:h-[190px] sm:w-[190px] overflow-hidden rounded-xl bg-zinc-200 shrink-0">
                <Image
                    src={props.productImage}
                    alt="product-image"
                    fill={true}
                    sizes="100%"
                    className="rounded-xl object-cover"
                />
            </div>
            <div className="flex flex-col items-start sm:ms-3">
                <Link href={`/products/${props.productId}`}>
                    <span className="font-kanit sm:text-xl">{props.productName}</span>
                </Link>
                <span className="sm:text-lg">₹{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                <SetQuantityButton productId={props.productId} quantity={props.quantity} />
                <DeleteCartItemButton productId={props.productId} />
            </div>
        </div>
    )
}

export default CartItemCard